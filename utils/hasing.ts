import bcrypt from "bcryptjs";

const generateHash = async (payload: string, saltRound: number = 10): Promise<string> => {
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(payload, salt);
    return hash;
};

const hashMatched = async (raw: string, hash: string): Promise<boolean> => {
    const result = await bcrypt.compare(raw, hash);
    return result;
};

export {
    generateHash,
    hashMatched
};