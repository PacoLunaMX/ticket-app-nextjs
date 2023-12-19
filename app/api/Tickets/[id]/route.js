import Ticket from '../../../(models)/ticket'
import { NextResponse } from 'next/server'


export async function GET(req, {params}){
    try{
        const { id } = params;
        const ticket = await Ticket.findById(id);
        return NextResponse.json({ticket}, {status:200})
    
    }catch(error){
        return NextResponse.json(
            {
                message: "Error", 
                error
            }, 
            {
                status:500
            }
        
        )
    }

}
export async function PUT(req, {params}){
    try{
        const { id } = params;
        const body = await req.json();
        const ticketData = body
        const ticket = await Ticket.findByIdAndUpdate(id, ticketData);
        return NextResponse.json({"message":"Updated successfully!"}, {status:200})
    
    }catch(error){
        return NextResponse.json(
            {
                message: "Error", 
                error
            }, 
            {
                status:500
            }
        
        )
    }

}

export async function DELETE(req, {params}){
    try{
        const { id } = params;
        await Ticket.findByIdAndDelete(id);
        return NextResponse.json({"message": "Deleted successfully!"}, {status:200})
    
    }catch(error){
        return NextResponse.json(
            {
                message: "Error", 
                error
            }, 
            {
                status:500
            }
        
        )
    }

}