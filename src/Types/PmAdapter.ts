import { AppObjectRepo } from "../AppObject";

export interface PmAdapter<VM> {
  defaultVM: VM;
  subscribe(
    id: string,
    appObjects: AppObjectRepo,
    setVM: (vm: VM) => void
  ): void;
  unsubscribe(
    id: string,
    appObjects: AppObjectRepo,
    setVM: (vm: VM) => void
  ): void;
}
