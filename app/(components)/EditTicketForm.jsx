"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function TicketForm({ ticket }) {
   const EDITMODE = ticket._id == "new" ? false : true

   const router = useRouter();
    const startingTicketData = {
        title: ticket?.title ?? "", 
        description: ticket?.description ?? "",
        priority: ticket?.priority ?? 1,
        progress: ticket?.progress ?? 0,
        status: ticket?.status ?? "not started",
        category:ticket?.category ?? "Hardware Problem"
    }
    const [formData, setFormData] = useState(startingTicketData)

    const handleChange = (e)=>{
        const value = e.target.value
        const name = e.target.name

        setFormData(prev=>({...prev, [name] : value}))
    }

    const handleSubmit = async (e)=>{
      e.preventDefault(); 
      if(EDITMODE){
          const res = await fetch(`/api/Tickets/${ticket._id}`,{
              method:"PUT",
              body: JSON.stringify(formData),
              "content-type":"application/json"
          })
          if(!res.ok){
            throw new Error("Failed to edit Ticket")
          }
      }else{
          const res = await fetch("/api/Tickets",{
              method:"POST",
              body: JSON.stringify(formData),
              "content-type":"application/json"
          })
          if(!res.ok){
            throw new Error("Failed to crete Ticket")
          }

      }

      router.refresh()
      router.push("/")
        
    }

  return (
    <div className='flex justify-center'>
        <form 
            className='flex flex-col gap-3 w-1/2' 
            method='post' 
            onSubmit={handleSubmit}
        >
            <h3>{EDITMODE ? "Edit Your Ticket" : "Create Your Ticket"}</h3>
            <label htmlFor="title">Title</label>
            <input 
                type="text" 
                id='title' 
                name='title'
                onChange={handleChange} 
                value={formData.title}
                className=''
                required
            />
            <label htmlFor="description">Description</label>
            <textarea
                id='description' 
                name='description'
                onChange={handleChange} 
                value={formData.description}
                className=''
                rows={5}
                required
            />
            <label htmlFor="category">Category</label>
            <select 
                name="category" 
                id="category" 
                value={formData.category}
                onChange={handleChange}
            >
                <option value="Hardware Problem">Hardware Problem</option>
                <option value="Software Problem">Software Problem</option>
                <option value="Project">Project</option>
            </select>

            <label>Priority</label>
            <div>
                <input 
                    id='priority-1'
                    name='priority'
                    type="radio"
                    onChange={handleChange} 
                    value={1}
                    checked={formData.priority == 1}
                />
                <label htmlFor="priority-1">1</label>
                <input 
                    id='priority-2'
                    name='priority'
                    type="radio"
                    onChange={handleChange} 
                    value={2}
                    checked={formData.priority == 2}
                />
                <label htmlFor="priority-2">2</label>
                <input 
                    id='priority-3'
                    name='priority'
                    type="radio"
                    onChange={handleChange} 
                    value={3}
                    checked={formData.priority == 3}
                />
                <label htmlFor="priority-3">3</label>
                <input 
                    id='priority-4'
                    name='priority'
                    type="radio"
                    onChange={handleChange} 
                    value={4}
                    checked={formData.priority == 4}
                />
                <label htmlFor="priority-4">4</label>
                <input 
                    id='priority-5'
                    name='priority'
                    type="radio"
                    onChange={handleChange} 
                    value={5}
                    checked={formData.priority == 5}
                />
                <label htmlFor="priority-5">5</label>
            </div>
            <label htmlFor="">Progress</label>
            <input 
                type="range" 
                id='progress'
                name="progress"
                value={formData.progress}
                min="0"
                max="100"
                onChange={handleChange}
            />
            <label htmlFor="status">Status</label>
            <select 
                name="status" 
                id="status"
                value={formData.status}
                onChange={handleChange}
            >
                <option value="not started">Not Started</option>
                <option value="started">Started</option>
                <option value="Done">Done</option>

            </select>
            <input 
                type="submit" 
                value={EDITMODE ? "Edit Your Ticket" : "Create Your Ticket"}
                className='btn'
            />
        </form>
    </div>
  )
}

export default TicketForm