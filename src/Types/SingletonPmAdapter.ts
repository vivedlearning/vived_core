import { AppObjectRepo } from "../AppObject";

export interface SingletonPmAdapter<VM> {
  defaultVM: VM;
  subscribe(appObjects: AppObjectRepo, setVM: (vm: VM) => void): void;
  unsubscribe(appObjects: AppObjectRepo, setVM: (vm: VM) => void): void;
}
