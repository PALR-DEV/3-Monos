import { NextRequest, NextResponse } from "next/server";
import menuItems from "../../../TEST_DATA/menuItems.json"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
        return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }

    const menuItem = menuItems.find(item => item.id === parseInt(id));
    if (!menuItem) {
        return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }
    return NextResponse.json(menuItem);
}
