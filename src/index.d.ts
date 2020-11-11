declare module 'rn-indy-sdk' {

  export type CredOffer = {
    schema_id: string,
    cred_def_id: string,
    // Fields below can depend on Cred Def type
    nonce: string,
    key_correctness_proof: any, // <key_correctness_proof>
  }

  export type CredDefId = string
  export type CredDef = {
    id: string, // identifier of credential definition
    schemaId: string, // identifier of stored in ledger schema
    type: string, // type of the credential definition. CL is the only supported type now.
    tag: string, // allows to distinct between credential definitions for the same issuer and schema
    value: {
      // Dictionary with Credential Definition's data:
      primary: any, // primary credential public key,
      revocation?: any, // revocation credential public key
    },
    ver: string, // Version of the Credential Definition json
  }

  export type CredId = string

// Credential json received from issuer
  export type Cred = {
    schema_id: string,
    cred_def_id: string,
    rev_reg_def_id?: string,
    values: {
      // "attr1" : {"raw": "value1", "encoded": "value1_as_int" },
      // "attr2" : {"raw": "value1", "encoded": "value1_as_int" }
      [key: string]: { raw: any, endcoded: any },
    }, // <see credValues above>,
    // Fields below can depend on Cred Def type
    signature: any, // <signature>
    signature_correctness_proof: any, // <signature_correctness_proof>
  }

  export type Credential = {
    referent: CredId, // cred_id in the wallet
    attrs?: {
      // "key1":"raw_value1",
      // "key2":"raw_value2"
      [key: string]: any,
    },
    schema_id: string,
    cred_def_id: string,
    rev_reg_id?: string, // Optional<string>,
    cred_rev_id?: string, // Optional<string>
  }

  export type MasterSecretId = string

  export type RequestedAttribute = string

  export type ProofRequest = {
    name: string,
    version: string,
    nonce: string,
    requested_attributes: {
      // set of requested attributes
      [attributeReferent: string]: {
        name: string,
      }, // <attr_referent>: <attr_info>
    },
    requested_predicates: {
      // set of requested predicates
      [attributePredicate: string]: {}, // <predicate_referent>: <predicate_info>
    },
    // Optional<<non_revoc_interval>>
    // If specified prover must proof non-revocation
    // for date in this interval for each attribute
    // (can be overridden on attribute level)
    non_revoked?: any,
  }

  export type Proof = {
    requested_proof: {
      revealed_attrs: {
        // requested_attr1_id: {sub_proof_index: number, raw: string, encoded: string},
        // requested_attr4_id: {sub_proof_index: number: string, encoded: string},
        [attributeReferent: string]: {
          raw: any,
        },
      },
      unrevealed_attrs: {
        // requested_attr3_id: {sub_proof_index: number}
        [attributeReferent: string]: {},
      },
      self_attested_attrs: {
        // requested_attr2_id: self_attested_value,
        [attributeReferent: string]: {},
      },
      requested_predicates: {
        // requested_predicate_1_referent: {sub_proof_index: int},
        // requested_predicate_2_referent: {sub_proof_index: int},
        [attributePredicate: string]: {},
      },
    },
    proof: {
      proofs: [], // [ <credential_proof>, <credential_proof>, <credential_proof> ],
      aggregated_proof: any, // <aggregated_proof>
    },
    identifiers: [], // [{schema_id, cred_def_id, Optional<rev_reg_id>, Optional<timestamp>}]
  }

  export type RequestedCredentials = {
    self_attested_attributes: {
      // "self_attested_attribute_referent": string
      [attributeReferent: string]: string,
    },
    requested_attributes: {
      // "requested_attribute_referent_1": {"cred_id": string, "timestamp": Optional<number>, revealed: <bool> }},
      // "requested_attribute_referent_2": {"cred_id": string, "timestamp": Optional<number>, revealed: <bool> }}
      [attributeReferent: string]: {},
    },
    requested_predicates: {
      // "requested_predicates_referent_1": {"cred_id": string, "timestamp": Optional<number> }},
      [key: string]: {},
    },
  }

  export type SchemaId = string
  export type Schema = {
    id: SchemaId,
    name: string,
    // TODO It would be better to remove `status` attribute, because is part of our business domain and not Indy.
    // This custom attribute shows state of the credential request (when waiting for documents approval).
    status?: string,
  }

  /**
   * Json - all schemas json participating in the proof request
   *  {
   *    <schema1_id>: <schema1_json>,
   *    <schema2_id>: <schema2_json>,
   *    <schema3_id>: <schema3_json>,
   *  }
   */
  export type Schemas = {
    [key: string]: Schema,
  }

  /**
   * Json - all credential definitions json participating in the proof request
   *  {
   *    "cred_def1_id": <credential_def1_json>,
   *    "cred_def2_id": <credential_def2_json>,
   *    "cred_def3_id": <credential_def3_json>,
   *  }
   */
  export type CredentialDefs = {
    [key: string]: CredDef,
  }

  /**
   * Json - all revocation states json participating in the proof request
   *  {
   *    "rev_reg_def1_id": {
   *        "timestamp1": <rev_state1>,
   *        "timestamp2": <rev_state2>,
   *    },
   *    "rev_reg_def2_id": {
   *        "timestamp3": <rev_state3>
   *    },
   *    "rev_reg_def3_id": {
   *        "timestamp4": <rev_state4>
   *    },
   *  }
   */
  export type RevStates = {}

  /**
   * Json - Request data json
   */
  export type LedgerRequest = {}

  export type LedgerRequestResult = {}

  export type CredReq = {
    prover_did: string,
    cred_def_id: string,
    // Fields below can depend on Cred Def type
    blinded_ms?: any, // <blinded_master_secret>,
    blinded_ms_correctness_proof?: any, // <blinded_ms_correctness_proof>,
    nonce?: string,
  }

  /**
   * Credential request metadata json for further processing of received form Issuer credential.
   */
  export type CredReqMetadata = {}

  /**
   * Json - revocation registry definition json related to <rev_reg_def_id> in <cred_json>
   */
  export type RevRegDef = {}

  export type Did = string

  export type Verkey = string

  export type WalletHandle = number
  export type PoolHandle = number

  export type WalletRecord = {
    id: string,
    type: string,
    value: string,
    tags: {},
  }

  export type WalletSearchHandle = number

  export type WalletRecrods = {
    totalCount?: string,
    records?: WalletRecord[],
  }

  export enum NymRole {
    TRUSTEE = 0,
    STEWARD = 2,
    TRUST_ANCHOR = 101,
    ENDORSER = 101,
    NETWORK_MONITOR = 201
  }

  export type GetNymResponse = {
    did: Did,
    verkey: Verkey,
    role: NymRole,
  }

  export function createWallet(config: Object, credentials: Object): Promise<void>;

  export function openWallet(config: Object, credentials: Object): Promise<WalletHandle>;

  export function closeWallet(wh: WalletHandle): Promise<void>;

  export function deleteWallet(config: Object, credentials: Object): Promise<void>;

  // did

  /**
   * Value of passed `wh` parameter will be ignored in Android version of Indy native bridge,
   * because it keeps wallet as a private attribute.
   */
  export function createAndStoreMyDid(wh: WalletHandle, did: Object): Promise<[Did, Verkey]>;

  export function keyForDid(poolHandle: PoolHandle, wh: WalletHandle, did: Did): Promise<Verkey>;

  export function keyForLocalDid(wh: WalletHandle, did: Did): Promise<Verkey>;

  export function storeTheirDid(wh: WalletHandle, identity: {}): Promise<void>;

// pairwise

  export function createPairwise(wh: WalletHandle, theirDid: Did, myDid: Did, metadata: string): Promise<void>;

  export function getPairwise(wh: WalletHandle, theirDid: Did): Promise<Object>

// crypto

  export function cryptoAnonCrypt(recipientVk: Verkey, messageRaw: Buffer): Promise<Buffer>;

  export function cryptoAnonDecrypt(wh: WalletHandle, recipientVk: Verkey, encryptedMsg: Buffer): Promise<Buffer>

  export function cryptoAuthCrypt(wh: WalletHandle, senderVk: Verkey, recipientVk: Verkey, messageRaw: Buffer): Promise<Buffer>

  export function cryptoAuthDecrypt(wh: WalletHandle, recipientVk: Verkey, encryptedMsgRaw: Buffer): Promise<[Verkey, Buffer]>

  export function cryptoSign(wh: WalletHandle, signerVk: string, message: Buffer): Promise<Buffer>

  export function cryptoVerify(signerVk: string, message: Buffer, signature: Buffer): Promise<Boolean>

  export function packMessage(wh: WalletHandle, message: Buffer, receiverKeys: Verkey[], senderVk: string): Promise<Buffer>

  export function unpackMessage(wh: WalletHandle, jwe: Buffer): Promise<Buffer>

  // pool

  export function createPoolLedgerConfig(poolName: string, poolConfig: {}): Promise<void>

  export function openPoolLedger(poolName: string, poolConfig: {} | undefined): Promise<PoolHandle>

  export function setProtocolVersion(protocolVersion: number): Promise<void>

  export function closePoolLedger(ph: PoolHandle): Promise<void>

  export function submitRequest(poolHandle: PoolHandle, request: LedgerRequest): Promise<LedgerRequestResult>;

  export function buildGetSchemaRequest(submitterDid: Did, id: string): Promise<LedgerRequest>

  export function buildGetAttribRequest(
    submitterDid: Did | null,
    targetDid: Did,
    raw: string | null,
    hash: string | null,
    enc: string | null
  ): Promise<LedgerRequest>

  export function buildGetNymRequest(submitterDid: Did | null, targetDid: Did): Promise<LedgerRequest>

  export function parseGetNymResponse(response: LedgerRequestResult): Promise<GetNymResponse>

  export function parseGetSchemaResponse(getSchemaResponse: LedgerRequestResult): Promise<[SchemaId, Schema]>

  export function buildGetCredDefRequest(submitterDid: Did, id: string): Promise<LedgerRequestResult>;

  export function parseGetCredDefResponse(getCredDefResponse: LedgerRequestResult): Promise<[CredDefId, CredDef]>

  export function proverCreateMasterSecret(wh: WalletHandle, masterSecretId?: MasterSecretId): Promise<MasterSecretId>

  export function proverCreateCredentialReq(
    wh: WalletHandle,
    proverDid: Did,
    credOffer: CredOffer,
    credDef: CredDef,
    masterSecretId: MasterSecretId
  ): Promise<[CredReq, CredReqMetadata]>

  export function proverStoreCredential(
    wh: WalletHandle,
    credId: CredId,
    credReqMetadata: CredReqMetadata,
    cred: Cred,
    credDef: CredDef,
    revRegDef?: RevRegDef
  ): Promise<CredId>;

  export function proverGetCredentials(wh: WalletHandle, filter: {}): Promise<Credential[]> ;

  export function proverGetCredential(wh: WalletHandle, credId: CredId): Promise<Credential>;

// TODO Add return flow type.
// It needs little investigation, because is doesn't seem to be same format as Credential stored in wallet.
  export function proverGetCredentialsForProofReq(wh: WalletHandle, proofRequest: ProofRequest): Promise<void>;

  export function proverCreateProof(
    wh: WalletHandle,
    proofReq: ProofRequest,
    requestedCredentials: RequestedCredentials,
    masterSecretName: MasterSecretId,
    schemas: Schemas,
    credentialDefs: CredentialDefs,
    revStates: RevStates
  ): Promise<Proof>

// non_secrets

  export function addWalletRecord(wh: WalletHandle, type: string, id: string, value: string, tags: {}): Promise<void>;

  export function updateWalletRecordValue(wh: WalletHandle, type: string, id: string, value: string): Promise<void>;

  export function updateWalletRecordTags(wh: WalletHandle, type: string, id: string, tags: {}): Promise<void> ;

  export function addWalletRecordTags(wh: WalletHandle, type: string, id: string, tags: {}): Promise<void>;

  export function deleteWalletRecordTags(wh: WalletHandle, type: string, id: string, tagNames: []): Promise<void>;

  export function deleteWalletRecord(wh: WalletHandle, type: string, id: string): Promise<void>;

  export function getWalletRecord(wh: WalletHandle, type: string, id: string, options: {}): Promise<WalletRecord> ;

  export function openWalletSearch(wh: WalletHandle, type: string, query: {}, options: {}): Promise<number>;

  export function fetchWalletSearchNextRecords(wh: WalletHandle, sh: WalletSearchHandle, count: number): Promise<any>//Promise<WalletRecords>

  export function closeWalletSearch(sh: WalletSearchHandle): Promise<void>
}

