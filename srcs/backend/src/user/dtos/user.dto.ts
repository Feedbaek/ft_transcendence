import { User } from 'src/user/entities/user.entity';
import Avatar  from 'src/user/entities/avatar.entity';
import { BaseOutput } from 'src/common/dtos/base.dto';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class getMeOutput extends BaseOutput {
  user?: User;
}

export class CreateUserOutput extends BaseOutput {
  user?: User;
}

export class getUserByNickNameOutput extends BaseOutput {
  user?: User;
}

export class getUserByIdOutput extends BaseOutput {
  user?: User;
}

export class CheckNickNameOutput extends BaseOutput {}

export class UpdateUserOutput extends BaseOutput {}

export class changeAvatarOutput extends BaseOutput {}

export class UpdateUserDto {
  @IsString()
  nickname?: string;
  @IsBoolean()
  verified?: boolean;
  @IsString()
  phone?: string;
  @IsString()
  code?: string;
}

export class getScoreByNickNameOutput extends BaseOutput {
	score?: any;
}
