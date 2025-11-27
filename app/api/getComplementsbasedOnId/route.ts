//it get the compliments of the food based on the menu id
import { NextRequest, NextResponse } from "next/server";
import menuItemComplements from '../../../TEST_DATA/menuItemComplements.json';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
        return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }
    const complements = menuItemComplements.find(item => item.menuItemId === parseInt(id))?.complements;
    if (!complements) {
        return NextResponse.json({ error: 'No complements found for this menu item' }, { status: 404 });
    }
    return NextResponse.json(complements);
}