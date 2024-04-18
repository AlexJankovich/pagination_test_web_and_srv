import { ListMetaDto } from './list-meta.dto';
import { MetaInfo } from './meta-info.type';

export class ListDto<T> {
  data: Array<T>;
  meta: ListMetaDto;
  additionalData: any;

  constructor(data: Array<T>, { page, itemsCount, limit }: MetaInfo, additionalData?: any) {
    this.data = data;
    this.meta = new ListMetaDto();
    this.meta.page = Number(page);
    this.meta.itemsCount = Number(itemsCount);
    this.meta.limit = Number(limit);
    this.meta.returned = data.length;
    this.meta.offset = (page - 1) * limit;
    this.meta.pagesCount = Math.ceil(itemsCount / limit);
    this.additionalData = additionalData;
  }
}
