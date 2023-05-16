import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as Cheerio from 'cheerio';

@Injectable()
export class CrawlingService {
  async create(keyword: string) {
    const naverNewsSearchResult = await axios.get(
      `https://search.naver.com/search.naver?where=news&ie=utf8&sm=nws_hty&query=${keyword}`,
    );
    const result = [];

    const $ = Cheerio.load(naverNewsSearchResult.data);
    for (let i = 1; i < 20; i++) {
      result.push($(`#sp_nws${i} > div > div > a`).text());
    }

    return result.filter((n) => n);
  }
}
