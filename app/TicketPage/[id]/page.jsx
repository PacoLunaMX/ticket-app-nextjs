import React from 'react'
import TicketCard from '@/app/(components)/TicketCard'
import EditTicketForm from '@/app/(components)/EditTicketForm'

const getTicketById = async (id)=>{
  try {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`,{
      cache:"no-store"
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function TicketPage({params}) {
  const EDITMODE= params.id == "new" ? false : true
  const { id } = params
  let updateTicketdata = {}

  if(EDITMODE){
    updateTicketdata = await getTicketById(id)
    updateTicketdata = updateTicketdata.ticket
  }else{
    updateTicketdata={
      _id:"new"
    }
  }


  return (
    <div>
        <EditTicketForm ticket={updateTicketdata} />
    </div>
  )
}

export default TicketPage