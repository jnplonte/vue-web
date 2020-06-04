import { Helper } from '@/services/helper/helper.service';
import { Request } from '@/services/request/request.service';

export const DEFAULT_PAGE_SIZE: number = 50;

export const DEFAULT_PAGINATION: object = {
  sortType: 'DESC',
  sortBy: null,
  currentPage: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  totalData: 0,
};

export class ReportAPI {
  protected requestAuth: Request = null;
  protected helper: Helper = new Helper();
  protected requestParameters: object = null;
  protected customerKey: string = null;

  constructor({ customerKey }) {
    this.customerKey = customerKey;

    this.requestAuth = new Request('application/json', process.env.VUE_APP_SECRET_KEY_HASH);
    this.requestParameters = {
      [process.env.VUE_APP_CUSTOMER_KEY]: this.customerKey,
    };
  }

  queryReport({ requestParameters, reportName }) {
    const params = {
      ...this.requestParameters,
      ...requestParameters,
    };

    switch (reportName) {
      case 'shipmentStatus':
        return this.requestAuth.get('ANALYTICS_SHIPMENT', 'query/status', params);
      case 'shipmentVolume':
        return this.requestAuth.get('ANALYTICS_SHIPMENT', 'query/volume', params);
      case 'vmsSummary':
        return this.requestAuth.get('ANALYTICS_VMS', 'query/summary', params);
    }
  }

  exportReport({ requestParameters, reportName }) {
    const params = {
      ...this.requestParameters,
      ...requestParameters,
    };

    switch (reportName) {
      case 'shipmentStatus':
        return this.requestAuth.get('ANALYTICS_SHIPMENT', 'export/status', params);
      case 'shipmentVolume':
        return this.requestAuth.get('ANALYTICS_SHIPMENT', 'export/volume', params);
      case 'vmsSummary':
        return this.requestAuth.get('ANALYTICS_VMS', 'export/summary', params);
    }
  }
}

