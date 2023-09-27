import { ethers } from "ethers";

function isBytes32(bytes32: string): boolean {
    const regex = /^0x[a-fA-F0-9]{64}$/;
    if (!regex.test(bytes32)) {
        return false;
    }
    return true;
}

function isAddress(address: string): boolean {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    if (!regex.test(address)) {
        return false;
    }
    return true;
}

function calcGuardianHash(guardians: string[], threshold: number, salt: string = ethers.ZeroHash): string {
    if (guardians.length === 0) {
        return ethers.ZeroHash;
    }
    
    /* 
    (address[] memory guardians, uint256 threshold, uint256 salt) =
        abi.decode(rawGuardian, (address[], uint256, uint256));
    */

    guardians.sort((a, b) => {
        {
            const ret = isAddress(a);
            if (ret == false) {
                throw new Error("address is invalid");
            }
        }

        const aBig = BigInt(a);
        const bBig = BigInt(b);
        if (aBig === bBig) {
            throw new Error(`guardian address is same: ${a}`);
        } else if (aBig < bBig) {
            return -1;
        } else {
            return 1;
        }
    });
    let ret = isBytes32(salt);
    if (ret == false) {
        throw new Error("bytes32 is invalid");
    }

    const abiEncoded = new ethers.AbiCoder().encode(["address[]", "uint256", "uint256"], [guardians, threshold, salt]);
    const keccak256 = ethers.keccak256(abiEncoded);
    return keccak256; 
}