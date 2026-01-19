import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsString, MinLength } from "class-validator";

export class CreateTaskDto {
    @ApiProperty({
        example: "Ordenar el Cuarto"
    })
    @IsString()
    @MinLength(3)
    taskName: string;

    @ApiProperty({
        example: "Ordenar de manera especifica el cuarto para la gestion del espacio"
    })
    @IsString()
    @MinLength(5)
    description: string;

    @ApiProperty({
        example: "userId"
    })
    userId: string;
}
