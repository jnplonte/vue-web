import { Request } from '@/services/request/request.service';

export class RawQueryAPI {
  protected userKey: string = null;
  protected requestAuth: Request = null;

  constructor({ userKey }) {
    this.userKey = userKey;

    this.requestAuth = new Request('application/json', userKey);
  }

  getFromRawQuery(payload) {
    return this.requestAuth.post('LEGACY_RAW_QUERY', '', {}, payload);
  }
}
