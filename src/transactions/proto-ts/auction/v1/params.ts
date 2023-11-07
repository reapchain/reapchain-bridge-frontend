/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 0.0.0
 * source: auction/v1/params.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from "google-protobuf";
export namespace auction.v1 {
    export class Params extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            auction_length?: number;
            min_bid_fee?: number;
            non_auctionable_tokens?: string[];
            burn_winning_bids?: boolean;
            enabled?: boolean;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("auction_length" in data && data.auction_length != undefined) {
                    this.auction_length = data.auction_length;
                }
                if ("min_bid_fee" in data && data.min_bid_fee != undefined) {
                    this.min_bid_fee = data.min_bid_fee;
                }
                if ("non_auctionable_tokens" in data && data.non_auctionable_tokens != undefined) {
                    this.non_auctionable_tokens = data.non_auctionable_tokens;
                }
                if ("burn_winning_bids" in data && data.burn_winning_bids != undefined) {
                    this.burn_winning_bids = data.burn_winning_bids;
                }
                if ("enabled" in data && data.enabled != undefined) {
                    this.enabled = data.enabled;
                }
            }
        }
        get auction_length() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0) as number;
        }
        set auction_length(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get min_bid_fee() {
            return pb_1.Message.getFieldWithDefault(this, 2, 0) as number;
        }
        set min_bid_fee(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get non_auctionable_tokens() {
            return pb_1.Message.getFieldWithDefault(this, 3, []) as string[];
        }
        set non_auctionable_tokens(value: string[]) {
            pb_1.Message.setField(this, 3, value);
        }
        get burn_winning_bids() {
            return pb_1.Message.getFieldWithDefault(this, 4, false) as boolean;
        }
        set burn_winning_bids(value: boolean) {
            pb_1.Message.setField(this, 4, value);
        }
        get enabled() {
            return pb_1.Message.getFieldWithDefault(this, 5, false) as boolean;
        }
        set enabled(value: boolean) {
            pb_1.Message.setField(this, 5, value);
        }
        static fromObject(data: {
            auction_length?: number;
            min_bid_fee?: number;
            non_auctionable_tokens?: string[];
            burn_winning_bids?: boolean;
            enabled?: boolean;
        }): Params {
            const message = new Params({});
            if (data.auction_length != null) {
                message.auction_length = data.auction_length;
            }
            if (data.min_bid_fee != null) {
                message.min_bid_fee = data.min_bid_fee;
            }
            if (data.non_auctionable_tokens != null) {
                message.non_auctionable_tokens = data.non_auctionable_tokens;
            }
            if (data.burn_winning_bids != null) {
                message.burn_winning_bids = data.burn_winning_bids;
            }
            if (data.enabled != null) {
                message.enabled = data.enabled;
            }
            return message;
        }
        toObject() {
            const data: {
                auction_length?: number;
                min_bid_fee?: number;
                non_auctionable_tokens?: string[];
                burn_winning_bids?: boolean;
                enabled?: boolean;
            } = {};
            if (this.auction_length != null) {
                data.auction_length = this.auction_length;
            }
            if (this.min_bid_fee != null) {
                data.min_bid_fee = this.min_bid_fee;
            }
            if (this.non_auctionable_tokens != null) {
                data.non_auctionable_tokens = this.non_auctionable_tokens;
            }
            if (this.burn_winning_bids != null) {
                data.burn_winning_bids = this.burn_winning_bids;
            }
            if (this.enabled != null) {
                data.enabled = this.enabled;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.auction_length != 0)
                writer.writeUint64(1, this.auction_length);
            if (this.min_bid_fee != 0)
                writer.writeUint64(2, this.min_bid_fee);
            if (this.non_auctionable_tokens.length)
                writer.writeRepeatedString(3, this.non_auctionable_tokens);
            if (this.burn_winning_bids != false)
                writer.writeBool(4, this.burn_winning_bids);
            if (this.enabled != false)
                writer.writeBool(5, this.enabled);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Params {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Params();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.auction_length = reader.readUint64();
                        break;
                    case 2:
                        message.min_bid_fee = reader.readUint64();
                        break;
                    case 3:
                        pb_1.Message.addToRepeatedField(message, 3, reader.readString());
                        break;
                    case 4:
                        message.burn_winning_bids = reader.readBool();
                        break;
                    case 5:
                        message.enabled = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): Params {
            return Params.deserialize(bytes);
        }
    }
}
