import { NextRequest, NextResponse } from "next/server";
import menuItems from "../../../TEST_DATA/menuItems.json"

export async function GET(request: NextRequest){
    return NextResponse.json(menuItems);
}