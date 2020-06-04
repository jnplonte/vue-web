import { Request } from '@/services/request/request.service';

export class ToolsAPI {
  protected userKey: string = null;
  protected request: Request = null;

  constructor() {
    this.request = new Request('application/json', process.env.VUE_APP_SECRET_KEY_HASH);
  }

  encodeKey(payload) {
    return this.request.post('LEGACY_TOOLS', 'encode-key', {}, payload);
  }
}
