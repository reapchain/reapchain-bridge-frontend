/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 0.0.0
 * source: auction/v1/msgs.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as dependency_1 from "./../../google/api/annotations";
import * as pb_1 from "google-protobuf";
import * as grpc_1 from "@grpc/grpc-js";
export namespace auction.v1 {
    export class MsgBid extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            auction_id?: number;
            bidder?: string;
            amount?: number;
            bid_fee?: number;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("auction_id" in data && data.auction_id != undefined) {
                    this.auction_id = data.auction_id;
                }
                if ("bidder" in data && data.bidder != undefined) {
                    this.bidder = data.bidder;
                }
                if ("amount" in data && data.amount != undefined) {
                    this.amount = data.amount;
                }
                if ("bid_fee" in data && data.bid_fee != undefined) {
                    this.bid_fee = data.bid_fee;
                }
            }
        }
        get auction_id() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0) as number;
        }
        set auction_id(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get bidder() {
            return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
        }
        set bidder(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get amount() {
            return pb_1.Message.getFieldWithDefault(this, 3, 0) as number;
        }
        set amount(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        get bid_fee() {
            return pb_1.Message.getFieldWithDefault(this, 4, 0) as number;
        }
        set bid_fee(value: number) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data: {
            auction_id?: number;
            bidder?: string;
            amount?: number;
            bid_fee?: number;
        }): MsgBid {
            const message = new MsgBid({});
            if (data.auction_id != null) {
                message.auction_id = data.auction_id;
            }
            if (data.bidder != null) {
                message.bidder = data.bidder;
            }
            if (data.amount != null) {
                message.amount = data.amount;
            }
            if (data.bid_fee != null) {
                message.bid_fee = data.bid_fee;
            }
            return message;
        }
        toObject() {
            const data: {
                auction_id?: number;
                bidder?: string;
                amount?: number;
                bid_fee?: number;
            } = {};
            if (this.auction_id != null) {
                data.auction_id = this.auction_id;
            }
            if (this.bidder != null) {
                data.bidder = this.bidder;
            }
            if (this.amount != null) {
                data.amount = this.amount;
            }
            if (this.bid_fee != null) {
                data.bid_fee = this.bid_fee;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.auction_id != 0)
                writer.writeUint64(1, this.auction_id);
            if (this.bidder.length)
                writer.writeString(2, this.bidder);
            if (this.amount != 0)
                writer.writeUint64(3, this.amount);
            if (this.bid_fee != 0)
                writer.writeUint64(4, this.bid_fee);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgBid {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgBid();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.auction_id = reader.readUint64();
                        break;
                    case 2:
                        message.bidder = reader.readString();
                        break;
                    case 3:
                        message.amount = reader.readUint64();
                        break;
                    case 4:
                        message.bid_fee = reader.readUint64();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): MsgBid {
            return MsgBid.deserialize(bytes);
        }
    }
    export class MsgBidResponse extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {}) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") { }
        }
        static fromObject(data: {}): MsgBidResponse {
            const message = new MsgBidResponse({});
            return message;
        }
        toObject() {
            const data: {} = {};
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgBidResponse {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgBidResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): MsgBidResponse {
            return MsgBidResponse.deserialize(bytes);
        }
    }
    interface GrpcUnaryServiceInterface<P, R> {
        (message: P, metadata: grpc_1.Metadata, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, metadata: grpc_1.Metadata, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
    }
    interface GrpcStreamServiceInterface<P, R> {
        (message: P, metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): grpc_1.ClientReadableStream<R>;
        (message: P, options?: grpc_1.CallOptions): grpc_1.ClientReadableStream<R>;
    }
    interface GrpWritableServiceInterface<P, R> {
        (metadata: grpc_1.Metadata, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
        (metadata: grpc_1.Metadata, callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
        (options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
        (callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
    }
    interface GrpcChunkServiceInterface<P, R> {
        (metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): grpc_1.ClientDuplexStream<P, R>;
        (options?: grpc_1.CallOptions): grpc_1.ClientDuplexStream<P, R>;
    }
    interface GrpcPromiseServiceInterface<P, R> {
        (message: P, metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): Promise<R>;
        (message: P, options?: grpc_1.CallOptions): Promise<R>;
    }
    export abstract class UnimplementedMsgService {
        static definition = {
            Bid: {
                path: "/auction.v1.Msg/Bid",
                requestStream: false,
                responseStream: false,
                requestSerialize: (message: MsgBid) => Buffer.from(message.serialize()),
                requestDeserialize: (bytes: Buffer) => MsgBid.deserialize(new Uint8Array(bytes)),
                responseSerialize: (message: MsgBidResponse) => Buffer.from(message.serialize()),
                responseDeserialize: (bytes: Buffer) => MsgBidResponse.deserialize(new Uint8Array(bytes))
            }
        };
        [method: string]: grpc_1.UntypedHandleCall;
        abstract Bid(call: grpc_1.ServerUnaryCall<MsgBid, MsgBidResponse>, callback: grpc_1.sendUnaryData<MsgBidResponse>): void;
    }
    export class MsgClient extends grpc_1.makeGenericClientConstructor(UnimplementedMsgService.definition, "Msg", {}) {
        constructor(address: string, credentials: grpc_1.ChannelCredentials, options?: Partial<grpc_1.ChannelOptions>) {
            super(address, credentials, options);
        }
        Bid: GrpcUnaryServiceInterface<MsgBid, MsgBidResponse> = (message: MsgBid, metadata: grpc_1.Metadata | grpc_1.CallOptions | grpc_1.requestCallback<MsgBidResponse>, options?: grpc_1.CallOptions | grpc_1.requestCallback<MsgBidResponse>, callback?: grpc_1.requestCallback<MsgBidResponse>): grpc_1.ClientUnaryCall => {
            return super.Bid(message, metadata, options, callback);
        };
    }
}
