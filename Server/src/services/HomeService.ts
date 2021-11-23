import { injectable } from "inversify";
import { CommonResponse } from "../interfaces";
@injectable()
export class HomeService {
  public async get(): Promise<CommonResponse> {
    return { data: "Tuki sem" };
  }
}
