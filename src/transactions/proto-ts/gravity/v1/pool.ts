/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 0.0.0
 * source: gravity/v1/pool.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as dependency_1 from "./../../gogoproto/gogo";
import * as pb_1 from "google-protobuf";
export namespace gravity.v1 {
    export class IDSet extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            ids?: number[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("ids" in data && data.ids != undefined) {
                    this.ids = data.ids;
                }
            }
        }
        get ids() {
            return pb_1.Message.getFieldWithDefault(this, 1, []) as number[];
        }
        set ids(value: number[]) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data: {
            ids?: number[];
        }): IDSet {
            const message = new IDSet({});
            if (data.ids != null) {
                message.ids = data.ids;
            }
            return message;
        }
        toObject() {
            const data: {
                ids?: number[];
            } = {};
            if (this.ids != null) {
                data.ids = this.ids;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.ids.length)
                writer.writePackedUint64(1, this.ids);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): IDSet {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new IDSet();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.ids = reader.readPackedUint64();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): IDSet {
            return IDSet.deserialize(bytes);
        }
    }
    export class BatchFees extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            token?: string;
            total_fees?: string;
            tx_count?: number;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("token" in data && data.token != undefined) {
                    this.token = data.token;
                }
                if ("total_fees" in data && data.total_fees != undefined) {
                    this.total_fees = data.total_fees;
                }
                if ("tx_count" in data && data.tx_count != undefined) {
                    this.tx_count = data.tx_count;
                }
            }
        }
        get token() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set token(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get total_fees() {
            return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
        }
        set total_fees(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get tx_count() {
            return pb_1.Message.getFieldWithDefault(this, 3, 0) as number;
        }
        set tx_count(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data: {
            token?: string;
            total_fees?: string;
            tx_count?: number;
        }): BatchFees {
            const message = new BatchFees({});
            if (data.token != null) {
                message.token = data.token;
            }
            if (data.total_fees != null) {
                message.total_fees = data.total_fees;
            }
            if (data.tx_count != null) {
                message.tx_count = data.tx_count;
            }
            return message;
        }
        toObject() {
            const data: {
                token?: string;
                total_fees?: string;
                tx_count?: number;
            } = {};
            if (this.token != null) {
                data.token = this.token;
            }
            if (this.total_fees != null) {
                data.total_fees = this.total_fees;
            }
            if (this.tx_count != null) {
                data.tx_count = this.tx_count;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.token.length)
                writer.writeString(1, this.token);
            if (this.total_fees.length)
                writer.writeString(2, this.total_fees);
            if (this.tx_count != 0)
                writer.writeUint64(3, this.tx_count);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BatchFees {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new BatchFees();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.token = reader.readString();
                        break;
                    case 2:
                        message.total_fees = reader.readString();
                        break;
                    case 3:
                        message.tx_count = reader.readUint64();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): BatchFees {
            return BatchFees.deserialize(bytes);
        }
    }
    export class EventWithdrawalReceived extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            bridge_contract?: string;
            bridge_chain_id?: string;
            outgoing_tx_id?: string;
            nonce?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("bridge_contract" in data && data.bridge_contract != undefined) {
                    this.bridge_contract = data.bridge_contract;
                }
                if ("bridge_chain_id" in data && data.bridge_chain_id != undefined) {
                    this.bridge_chain_id = data.bridge_chain_id;
                }
                if ("outgoing_tx_id" in data && data.outgoing_tx_id != undefined) {
                    this.outgoing_tx_id = data.outgoing_tx_id;
                }
                if ("nonce" in data && data.nonce != undefined) {
                    this.nonce = data.nonce;
                }
            }
        }
        get bridge_contract() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set bridge_contract(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get bridge_chain_id() {
            return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
        }
        set bridge_chain_id(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get outgoing_tx_id() {
            return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
        }
        set outgoing_tx_id(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        get nonce() {
            return pb_1.Message.getFieldWithDefault(this, 4, "") as string;
        }
        set nonce(value: string) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data: {
            bridge_contract?: string;
            bridge_chain_id?: string;
            outgoing_tx_id?: string;
            nonce?: string;
        }): EventWithdrawalReceived {
            const message = new EventWithdrawalReceived({});
            if (data.bridge_contract != null) {
                message.bridge_contract = data.bridge_contract;
            }
            if (data.bridge_chain_id != null) {
                message.bridge_chain_id = data.bridge_chain_id;
            }
            if (data.outgoing_tx_id != null) {
                message.outgoing_tx_id = data.outgoing_tx_id;
            }
            if (data.nonce != null) {
                message.nonce = data.nonce;
            }
            return message;
        }
        toObject() {
            const data: {
                bridge_contract?: string;
                bridge_chain_id?: string;
                outgoing_tx_id?: string;
                nonce?: string;
            } = {};
            if (this.bridge_contract != null) {
                data.bridge_contract = this.bridge_contract;
            }
            if (this.bridge_chain_id != null) {
                data.bridge_chain_id = this.bridge_chain_id;
            }
            if (this.outgoing_tx_id != null) {
                data.outgoing_tx_id = this.outgoing_tx_id;
            }
            if (this.nonce != null) {
                data.nonce = this.nonce;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.bridge_contract.length)
                writer.writeString(1, this.bridge_contract);
            if (this.bridge_chain_id.length)
                writer.writeString(2, this.bridge_chain_id);
            if (this.outgoing_tx_id.length)
                writer.writeString(3, this.outgoing_tx_id);
            if (this.nonce.length)
                writer.writeString(4, this.nonce);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): EventWithdrawalReceived {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EventWithdrawalReceived();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.bridge_contract = reader.readString();
                        break;
                    case 2:
                        message.bridge_chain_id = reader.readString();
                        break;
                    case 3:
                        message.outgoing_tx_id = reader.readString();
                        break;
                    case 4:
                        message.nonce = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): EventWithdrawalReceived {
            return EventWithdrawalReceived.deserialize(bytes);
        }
    }
    export class EventWithdrawCanceled extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            sender?: string;
            tx_id?: string;
            bridge_contract?: string;
            bridge_chain_id?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("sender" in data && data.sender != undefined) {
                    this.sender = data.sender;
                }
                if ("tx_id" in data && data.tx_id != undefined) {
                    this.tx_id = data.tx_id;
                }
                if ("bridge_contract" in data && data.bridge_contract != undefined) {
                    this.bridge_contract = data.bridge_contract;
                }
                if ("bridge_chain_id" in data && data.bridge_chain_id != undefined) {
                    this.bridge_chain_id = data.bridge_chain_id;
                }
            }
        }
        get sender() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set sender(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get tx_id() {
            return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
        }
        set tx_id(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get bridge_contract() {
            return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
        }
        set bridge_contract(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        get bridge_chain_id() {
            return pb_1.Message.getFieldWithDefault(this, 4, "") as string;
        }
        set bridge_chain_id(value: string) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data: {
            sender?: string;
            tx_id?: string;
            bridge_contract?: string;
            bridge_chain_id?: string;
        }): EventWithdrawCanceled {
            const message = new EventWithdrawCanceled({});
            if (data.sender != null) {
                message.sender = data.sender;
            }
            if (data.tx_id != null) {
                message.tx_id = data.tx_id;
            }
            if (data.bridge_contract != null) {
                message.bridge_contract = data.bridge_contract;
            }
            if (data.bridge_chain_id != null) {
                message.bridge_chain_id = data.bridge_chain_id;
            }
            return message;
        }
        toObject() {
            const data: {
                sender?: string;
                tx_id?: string;
                bridge_contract?: string;
                bridge_chain_id?: string;
            } = {};
            if (this.sender != null) {
                data.sender = this.sender;
            }
            if (this.tx_id != null) {
                data.tx_id = this.tx_id;
            }
            if (this.bridge_contract != null) {
                data.bridge_contract = this.bridge_contract;
            }
            if (this.bridge_chain_id != null) {
                data.bridge_chain_id = this.bridge_chain_id;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.sender.length)
                writer.writeString(1, this.sender);
            if (this.tx_id.length)
                writer.writeString(2, this.tx_id);
            if (this.bridge_contract.length)
                writer.writeString(3, this.bridge_contract);
            if (this.bridge_chain_id.length)
                writer.writeString(4, this.bridge_chain_id);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): EventWithdrawCanceled {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EventWithdrawCanceled();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.sender = reader.readString();
                        break;
                    case 2:
                        message.tx_id = reader.readString();
                        break;
                    case 3:
                        message.bridge_contract = reader.readString();
                        break;
                    case 4:
                        message.bridge_chain_id = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): EventWithdrawCanceled {
            return EventWithdrawCanceled.deserialize(bytes);
        }
    }
}