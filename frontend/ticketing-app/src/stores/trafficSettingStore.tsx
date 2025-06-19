import { create } from "zustand";

interface ConfigState {
  architecture: string | null;
  checkedAPI: string[];
  trafficSetting: {
    population: string;
    stage: string;
  };
  maxTime: number | null;
  started: boolean;

  setArchitecture: (item: string) => void;
  toggleCheckedItem: (item: string) => void;
  settrafficSetting: (trafficSetting: { population: string; stage: string }) => void;
  setMaxTime: (time: number) => void;
  setStarted: (started: boolean) => void;
  reset: () => void;
}

const initialState = {
  architecture: null,
  checkedAPI: [],
  trafficSetting: {
    population: "",
    stage: "",
  },
  maxTime: null,
  started: false,
};

export const trafficSettingStore = create<ConfigState>((set) => ({
  architecture: null,
  checkedAPI: [],
  trafficSetting: {
    population: "",
    stage: "",
  },
  maxTime: null,
  started: false,

  setArchitecture: (item) => set({ architecture: item }),
  toggleCheckedItem: (item) =>
    set((state) => ({
      checkedAPI: state.checkedAPI.includes(item)
        ? state.checkedAPI.filter((i) => i !== item)
        : [...state.checkedAPI, item],
    })),
  settrafficSetting: (trafficSetting) => set({ trafficSetting }),
  setMaxTime: (time) => set({ maxTime: time }),
  setStarted: (started) => set({ started }),
  reset: () => set(initialState),
}));
