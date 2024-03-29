import { Service } from "diod";
import { BodyParam, HttpCode, JsonController, Post } from "routing-controllers";
import { PublishVideoService } from "../../../../../contexts/platform/video/application/PublishVideoService";

@Service()
@JsonController("/videos")
export class VideoPostController {
  constructor(private readonly service: PublishVideoService) {}

  @Post("/")
  @HttpCode(201)
  async publish(
    @BodyParam("title") title: string,
    @BodyParam("description") description: string
  ) {
    await this.service.run(title, description);


    return "User created";
  }
}
