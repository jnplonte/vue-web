import { Helper } from '@/services/helper/helper.service';
import { Request } from '@/services/request/request.service';

export class DashboardAPI {
  // protected settings: object = {};
  protected lfToken = null;
  protected requestAuth: Request = null;
  protected helper: Helper = new Helper();

  constructor({ lfToken }) {
    // this.settings = userSetting;
    this.lfToken = lfToken;
    this.requestAuth = new Request('application/json', this.lfToken);
  }

  getDashboardData() {
    return this.requestAuth
      .get('LEGACY_DASHBOARD', '', {
        frequency: 'week',
        filter: 'blockedProjects',
        type: 'status|customer|time|failShipment',
      });
  }

  getColumnTemplates(templateType) {
    return this.requestAuth.get('LEGACY_CORE', `setting?type=${templateType}`);
  }

  postColumnTemplate({ templateType, columns }) {
    return this.requestAuth.post('LEGACY_CORE', 'setting', {}, {
      type: templateType,
      settings: columns,
    });
  }

  putColumnTemplate({ templateType, columns }) {
    return this.requestAuth.put('LEGACY_CORE', `setting?type=${templateType}`, {}, {
      settings: columns,
    });
  }

  deleteColumnTemplate(templateType) {
    return this.requestAuth.delete('LEGACY_CORE', `setting?type=${templateType}`);
  }
}

