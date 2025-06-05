const PRODUCTION_API_HOST = 'https://heartbible.klutche.com';
const LOCAL_API_HOST = 'http://localhost:3000';

class ApiHostUseCase {
  private useProductionApi: boolean;

  constructor() {
    this.useProductionApi = false;
  }

  setUseProductionApi(value: boolean) {
    this.useProductionApi = value;
  }

  getApiHost(): string {
    if (process.env.NODE_ENV === 'production' || this.useProductionApi) {
      return PRODUCTION_API_HOST;
    }
    return LOCAL_API_HOST;
  }

  getFullApiUrl(path: string): string {
    return `${this.getApiHost()}${path}`;
  }
}

// 싱글톤 인스턴스 생성
export const apiHostUseCase = new ApiHostUseCase(); 