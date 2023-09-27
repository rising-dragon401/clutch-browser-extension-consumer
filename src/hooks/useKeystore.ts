import { useGuardianStore } from "@src/store/guardian";
import { ethers } from "ethers";

export default function useKeystore() {
    const { slotInitInfo, slot } = useGuardianStore();
}