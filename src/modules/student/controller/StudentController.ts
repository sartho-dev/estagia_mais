import { StudentService } from "../service/StudentService";
import { Response, Request } from "express";
import { createStudentSchema } from "../validators/CreateStudentValidator";
import {
  ApiResponse,
  CreateStudentResponse,
} from "../../../shared/types/ApiResponse";
import { asyncHandler } from "../../../shared/middleware/asyncHandler";

export class StudentController {
  constructor(private studentService: StudentService) {}

  createController = asyncHandler(async (req: Request, res: Response) => {
    const data = createStudentSchema.parse(req.body);
    const student = await this.studentService.createService(data);

    const response: ApiResponse<CreateStudentResponse> = {
      status: "success",
      data: student,
    };

    res.status(201).json(response);
  });

  
}
