import { NextApiRequest } from "next";
import { deleteStudentDb } from "@/db/studentDb";

export async function DELETE(
  req: NextApiRequest,
  { params } : { params : { id : number } }
): Promise<Response> {
  const p = await params;
  const studentId = Number(await p.id);

  const deletedStudentId = await deleteStudentDb(studentId);
  
  return new Response(JSON.stringify({ deletedStudentId }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}