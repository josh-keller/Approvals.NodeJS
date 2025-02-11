import {printArray, printJson} from "../../Utilities/Printers";
import {Options} from "../../Core/Options";
import {getJestNamer} from "./JestNamer";

const StringWriter = require("../../StringWriter");
const approvals = require("../../Approvals");


export function verify(sut: any, options?: Options): void {
    const config = approvals.getConfig();
    options = options || new Options()
    const scrubbed = options.scrub(`${sut}`);
    const writer = new StringWriter(config,  scrubbed, options.forFile().getFileExtension());
    approvals.verifyWithControl(getJestNamer(), writer, null, config);
}

export function verifyAsJson(data: any, options?: Options): void {
    const text = printJson(data);
    options = options || new Options()
    options = options.forFile().withFileExtention(".json")
    verify(text, options);
}

export function verifyAll<T>(header:string, list: T[], formatter?: ((element: T) => string), options?: Options): void{
    const text = printArray(header, list, formatter);
    verify(text, options);
}
