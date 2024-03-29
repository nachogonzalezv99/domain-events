import { Service } from "diod";
import {
    Authorized,
    CurrentUser,
    Get,
    HttpCode,
    JsonController,
} from "routing-controllers";
import { PublishVideoService } from "../../../../../contexts/platform/video/application/PublishVideoService";
import { GetUser } from "../../../../../contexts/platform/user/application/GetUser";
import { container } from "../../../../../contexts/platform/shared/infraestructure/dependencyInjection/diod.config";

interface AuthUser {
  id: string;
}

@Service()
@JsonController("/users")
export class UserGetController {
  constructor(private readonly service: PublishVideoService) {}

  @Authorized()
  @HttpCode(200)
  @Get("/@me/social-profile")
  async getSocialProfile(
    @CurrentUser() { id }: AuthUser
  ): Promise<{ active: boolean; name: string; socialMedia: any }> {
    const getUserService = container.get(GetUser);
    const [user, socialProfile] = await Promise.all([
      getUserService.run(id),
      this.findSocialProfile(id),
    ]);

    return {
      active: socialProfile?.active || false,
      name: socialProfile?.socialNameIdentifier.value,
      socialMedia: user.socialNetworks?.all,
    };
  }

  async findSocialProfile(id: string): Promise<any> {}
}
