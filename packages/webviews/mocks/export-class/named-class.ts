import { getStr } from '@/utils';
import {
  alias,
  mockable,
  MockBase,
  type MockRequest,
  type MockResponse,
} from '@flatjs/mock';

@mockable()
export class MockExportClassService extends MockBase {
  @alias('/export-named-class')
  async getCatalogs(_req: MockRequest, res: MockResponse) {
    const cachedData = this.$cache.get('export-default-class');
    res.json(
      this.$mock({
        code: '0000',
        message: getStr('export named @mockable () class'),
        data: {
          cachedData,
        },
      })
    );
  }
}
