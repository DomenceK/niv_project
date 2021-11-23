import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { CommonResponse } from "../interfaces";
import { HomeService } from "../services";
import { TYPES } from "../types";

@controller("/api/home")
export class HomeController {
  constructor(@inject(TYPES.HomeService) private homeService: HomeService) {}

  @httpGet("/")
  public getHome(): Promise<CommonResponse> {
    return this.homeService.get();
  }
}
