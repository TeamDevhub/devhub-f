import { Store } from './Store';
import { getCommonCode } from '@/api/api.common';
import type { CommonCodeResponse, CommonCodeRequest } from '@/types/type.api';
import type { CommonCode, CommonCodeItem, SelectComponentProps } from '@/types/type._common';

interface CodesState {
  codes: CommonCodeResponse | undefined;
  loading: boolean;
}

class CodesStore extends Store<CodesState> {
  constructor() {
    super({ codes: undefined, loading: false });
  }

  init = async (): Promise<void> => {
    this._setState({ loading: true });
    try {
      const res = await getCommonCode({} as CommonCodeRequest);
      this._setState({ codes: res.data, loading: false });
    } catch {
      this._setState({ loading: false });
    }
  };

  getCodesByGroup = (groupCode: CommonCode): CommonCodeItem[] => {
    if (!this._state.codes) return [];
    return this._state.codes[groupCode]?.children || [];
  };

  getCodeName = (groupCode: CommonCode, targetCode: string): string => {
    const group = this.getCodesByGroup(groupCode);
    const findName = (list: CommonCodeItem[]): string | undefined => {
      for (const item of list) {
        if (item.code === targetCode) return item.name;
        if (item.children) {
          const found = findName(item.children);
          if (found) return found;
        }
      }
    };
    return findName(group) || targetCode;
  };

  getSelectOptions = (groupCode: CommonCode): SelectComponentProps[] => {
    return this.getCodesByGroup(groupCode).map((item) => ({
      value: item.code,
      label: item.name,
    }));
  };

  refetch = async (): Promise<void> => {
    await this.init();
  };
}

export const codesStore = new CodesStore();
