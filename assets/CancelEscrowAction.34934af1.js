import{av as D,aw as Fe,d as M,ax as Ge,ay as v,az as A,aA as B,aB as l,aC as c,aD as P,aE as j,aF as Y,aG as ee,aH as s,aI as we,aJ as Se,aK as w,aL as te,aM as t,aN as e,aO as r,aP as a,aQ as f,aR as K,aS as Me,aT as I,aU as re,aV as L,aW as je,aX as Ee,aY as Le,aZ as Oe,a_ as yt,a$ as gt,b0 as kt,b1 as wt,b2 as St,P as N,b3 as W,b4 as V,b5 as vt,b6 as Qe,b7 as At,u as Ye,t as xt,y as Je,z as Bt,a0 as J,a8 as ne,aa as be,v as de,af as fe,w as _t,a1 as Xe,a2 as T,a6 as G,a3 as _,a4 as se,ab as ye,b8 as Ke,b9 as Tt,ba as It,ac as ge,bb as O,a7 as Rt,ad as Ct,a5 as Pt,bc as zt,am as C,ak as Et,bd as Lt}from"./index.6ea7639d.js";import{n as pe,_ as Ot,o as oe,p as qe,k as Kt,q as qt}from"./QTable.70da9350.js";const ve=o=>{const n=o.decode.bind(o),i=o.encode.bind(o);return{decode:n,encode:i}},Nt=o=>n=>{const i=D(o,n),{encode:p,decode:d}=ve(i),u=i;return u.decode=(m,k)=>{const S=d(m,k);return Fe(M.Buffer.from(S))},u.encode=(m,k,S)=>{const E=Ge(m,o);return p(E,k,S)},u},Wt=Nt(8),Vt=o=>{const n=v(o),{encode:i,decode:p}=ve(n),d=n;return d.decode=(u,m)=>!!p(u,m),d.encode=(u,m,k)=>{const S=Number(u);return i(S,m,k)},d};function Ne(o){try{return gt.ExtendedPoint.fromHex(o),!0}catch{return!1}}const Ht=o=>A.Buffer.isBuffer(o)?o:o instanceof Uint8Array?A.Buffer.from(o.buffer,o.byteOffset,o.byteLength):A.Buffer.from(o);class Dt{constructor(n){Object.assign(this,n)}encode(){return A.Buffer.from(kt(ae,this))}static decode(n){return wt(ae,this,n)}static decodeUnchecked(n){return St(ae,this,n)}}const ae=new Map;var Ze;let et;const $t=32,me=32;function Ut(o){return o._bn!==void 0}let We=1;et=Symbol.toStringTag;class h extends Dt{constructor(n){if(super({}),this._bn=void 0,Ut(n))this._bn=n._bn;else{if(typeof n=="string"){const i=Ee.decode(n);if(i.length!=me)throw new Error("Invalid public key input");this._bn=new Le(i)}else this._bn=new Le(n);if(this._bn.byteLength()>me)throw new Error("Invalid public key input")}}static unique(){const n=new h(We);return We+=1,new h(n.toBuffer())}equals(n){return this._bn.eq(n._bn)}toBase58(){return Ee.encode(this.toBytes())}toJSON(){return this.toBase58()}toBytes(){const n=this.toBuffer();return new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}toBuffer(){const n=this._bn.toArrayLike(A.Buffer);if(n.length===me)return n;const i=A.Buffer.alloc(32);return n.copy(i,32-n.length),i}get[et](){return`PublicKey(${this.toString()})`}toString(){return this.toBase58()}static async createWithSeed(n,i,p){const d=A.Buffer.concat([n.toBuffer(),A.Buffer.from(i),p.toBuffer()]),u=Oe(d);return new h(u)}static createProgramAddressSync(n,i){let p=A.Buffer.alloc(0);n.forEach(function(u){if(u.length>$t)throw new TypeError("Max seed length exceeded");p=A.Buffer.concat([p,Ht(u)])}),p=A.Buffer.concat([p,i.toBuffer(),A.Buffer.from("ProgramDerivedAddress")]);const d=Oe(p);if(Ne(d))throw new Error("Invalid seeds, address must fall off the curve");return new h(d)}static async createProgramAddress(n,i){return this.createProgramAddressSync(n,i)}static findProgramAddressSync(n,i){let p=255,d;for(;p!=0;){try{const u=n.concat(A.Buffer.from([p]));d=this.createProgramAddressSync(u,i)}catch(u){if(u instanceof TypeError)throw u;p--;continue}return[d,p]}throw new Error("Unable to find a viable program address nonce")}static async findProgramAddress(n,i){return this.findProgramAddressSync(n,i)}static isOnCurve(n){const i=new h(n);return Ne(i.toBytes())}}Ze=h;h.default=new Ze("11111111111111111111111111111111");ae.set(h,{kind:"struct",fields:[["_bn","u256"]]});new h("BPFLoader1111111111111111111111111111111111");const Ft=64,b=(o="publicKey")=>D(32,o),Q=(o="string")=>{const n=l([c("length"),c("lengthPadding"),D(Y(c(),-8),"chars")],o),i=n.decode.bind(n),p=n.encode.bind(n),d=n;return d.decode=(u,m)=>i(u,m).chars.toString(),d.encode=(u,m,k)=>{const S={chars:A.Buffer.from(u,"utf8")};return p(S,m,k)},d.alloc=u=>c().span+c().span+A.Buffer.from(u,"utf8").length,d},Gt=(o="authorized")=>l([b("staker"),b("withdrawer")],o),Mt=(o="lockup")=>l([P("unixTimestamp"),P("epoch"),b("custodian")],o),jt=(o="voteInit")=>l([b("nodePubkey"),b("authorizedVoter"),b("authorizedWithdrawer"),v("commission")],o),Qt=(o="voteAuthorizeWithSeedArgs")=>l([c("voteAuthorizationType"),b("currentAuthorityDerivedKeyOwnerPubkey"),Q("currentAuthorityDerivedKeySeed"),b("newAuthorized")],o);A.Buffer.alloc(Ft).fill(0);new h("SysvarC1ock11111111111111111111111111111111");new h("SysvarEpochSchedu1e111111111111111111111111");new h("Sysvar1nstructions1111111111111111111111111");new h("SysvarRecentB1ockHashes11111111111111111111");new h("SysvarRent111111111111111111111111111111111");new h("SysvarRewards111111111111111111111111111111");new h("SysvarS1otHashes111111111111111111111111111");new h("SysvarS1otHistory11111111111111111111111111");new h("SysvarStakeHistory1111111111111111111111111");const Yt=B("lamportsPerSignature"),Jt=l([c("version"),c("state"),b("authorizedPubkey"),b("nonce"),l([Yt],"feeCalculator")]);Jt.span;const Xt=o=>{const n=o.decode.bind(o),i=o.encode.bind(o);return{decode:n,encode:i}},Zt=o=>n=>{const i=D(o,n),{encode:p,decode:d}=Xt(i),u=i;return u.decode=(m,k)=>{const S=d(m,k);return Fe(A.Buffer.from(S))},u.encode=(m,k,S)=>{const E=Ge(m,o);return p(E,k,S)},u},X=Zt(8);Object.freeze({Create:{index:0,layout:l([c("instruction"),P("lamports"),P("space"),b("programId")])},Assign:{index:1,layout:l([c("instruction"),b("programId")])},Transfer:{index:2,layout:l([c("instruction"),X("lamports")])},CreateWithSeed:{index:3,layout:l([c("instruction"),b("base"),Q("seed"),P("lamports"),P("space"),b("programId")])},AdvanceNonceAccount:{index:4,layout:l([c("instruction")])},WithdrawNonceAccount:{index:5,layout:l([c("instruction"),P("lamports")])},InitializeNonceAccount:{index:6,layout:l([c("instruction"),b("authorized")])},AuthorizeNonceAccount:{index:7,layout:l([c("instruction"),b("authorized")])},Allocate:{index:8,layout:l([c("instruction"),P("space")])},AllocateWithSeed:{index:9,layout:l([c("instruction"),b("base"),Q("seed"),P("space"),b("programId")])},AssignWithSeed:{index:10,layout:l([c("instruction"),b("base"),Q("seed"),b("programId")])},TransferWithSeed:{index:11,layout:l([c("instruction"),X("lamports"),Q("seed"),b("programId")])},UpgradeNonceAccount:{index:12,layout:l([c("instruction")])}});new h("11111111111111111111111111111111");new h("BPFLoader2111111111111111111111111111111111");l([c("typeIndex"),X("deactivationSlot"),B("lastExtendedSlot"),v("lastExtendedStartIndex"),v(),j(b(),Y(v(),-1),"authority")]);const x=ee(we(h),s(),o=>new h(o)),tt=Se([s(),w("base64")]),Ae=ee(we(A.Buffer),tt,o=>A.Buffer.from(o[0],"base64"));function ot(o){return I([t({jsonrpc:w("2.0"),id:s(),result:o}),t({jsonrpc:w("2.0"),id:s(),error:t({code:te(),message:s(),data:f(yt())})})])}const eo=ot(te());function g(o){return ee(ot(o),eo,n=>"error"in n?n:{...n,result:re(n.result,o)})}function z(o){return g(t({context:t({slot:e()}),value:o}))}function ce(o){return t({context:t({slot:e()}),value:o})}const to=t({foundation:e(),foundationTerm:e(),initial:e(),taper:e(),terminal:e()});g(r(a(t({epoch:e(),effectiveSlot:e(),amount:e(),postBalance:e(),commission:f(a(e()))}))));const oo=r(t({slot:e(),prioritizationFee:e()})),no=t({total:e(),validator:e(),foundation:e(),epoch:e()}),so=t({epoch:e(),slotIndex:e(),slotsInEpoch:e(),absoluteSlot:e(),blockHeight:f(e()),transactionCount:f(e())}),ao=t({slotsPerEpoch:e(),leaderScheduleSlotOffset:e(),warmup:K(),firstNormalEpoch:e(),firstNormalSlot:e()}),ro=Me(s(),r(e())),$=a(I([t({}),s()])),io=t({err:$}),co=w("receivedSignature");t({"solana-core":s(),"feature-set":f(e())});z(t({err:a(I([t({}),s()])),logs:a(r(s())),accounts:f(a(r(a(t({executable:K(),owner:s(),lamports:e(),data:r(s()),rentEpoch:f(e())}))))),unitsConsumed:f(e()),returnData:f(a(t({programId:s(),data:Se([s(),w("base64")])})))}));z(t({byIdentity:Me(s(),r(e())),range:t({firstSlot:e(),lastSlot:e()})}));g(to);g(no);g(oo);g(so);g(ao);g(ro);g(e());z(t({total:e(),circulating:e(),nonCirculating:e(),nonCirculatingAccounts:r(x)}));const uo=t({amount:s(),uiAmount:a(e()),decimals:e(),uiAmountString:f(s())});z(r(t({address:x,amount:s(),uiAmount:a(e()),decimals:e(),uiAmountString:f(s())})));z(r(t({pubkey:x,account:t({executable:K(),owner:x,lamports:e(),data:Ae,rentEpoch:e()})})));const ke=t({program:s(),parsed:te(),space:e()});z(r(t({pubkey:x,account:t({executable:K(),owner:x,lamports:e(),data:ke,rentEpoch:e()})})));z(r(t({lamports:e(),address:x})));const xe=t({executable:K(),owner:x,lamports:e(),data:Ae,rentEpoch:e()});t({pubkey:x,account:xe});const lo=ee(I([we(A.Buffer),ke]),I([tt,ke]),o=>Array.isArray(o)?re(o,Ae):o),fo=t({executable:K(),owner:x,lamports:e(),data:lo,rentEpoch:e()});t({pubkey:x,account:fo});t({state:I([w("active"),w("inactive"),w("activating"),w("deactivating")]),active:e(),inactive:e()});g(r(t({signature:s(),slot:e(),err:$,memo:a(s()),blockTime:f(a(e()))})));g(r(t({signature:s(),slot:e(),err:$,memo:a(s()),blockTime:f(a(e()))})));t({subscription:e(),result:ce(xe)});const po=t({pubkey:x,account:xe});t({subscription:e(),result:ce(po)});const mo=t({parent:e(),slot:e(),root:e()});t({subscription:e(),result:mo});const ho=I([t({type:I([w("firstShredReceived"),w("completed"),w("optimisticConfirmation"),w("root")]),slot:e(),timestamp:e()}),t({type:w("createdBank"),parent:e(),slot:e(),timestamp:e()}),t({type:w("frozen"),slot:e(),timestamp:e(),stats:t({numTransactionEntries:e(),numSuccessfulTransactions:e(),numFailedTransactions:e(),maxTransactionsPerEntry:e()})}),t({type:w("dead"),slot:e(),timestamp:e(),err:s()})]);t({subscription:e(),result:ho});t({subscription:e(),result:ce(I([io,co]))});t({subscription:e(),result:e()});t({pubkey:s(),gossip:a(s()),tpu:a(s()),rpc:a(s()),version:a(s())});const Ve=t({votePubkey:s(),nodePubkey:s(),activatedStake:e(),epochVoteAccount:K(),epochCredits:r(Se([e(),e(),e()])),commission:e(),lastVote:e(),rootSlot:a(e())});g(t({current:r(Ve),delinquent:r(Ve)}));const bo=I([w("processed"),w("confirmed"),w("finalized")]),yo=t({slot:e(),confirmations:a(e()),err:$,confirmationStatus:f(bo)});z(r(a(yo)));g(e());const nt=t({accountKey:x,writableIndexes:r(e()),readonlyIndexes:r(e())}),Be=t({signatures:r(s()),message:t({accountKeys:r(s()),header:t({numRequiredSignatures:e(),numReadonlySignedAccounts:e(),numReadonlyUnsignedAccounts:e()}),instructions:r(t({accounts:r(e()),data:s(),programIdIndex:e()})),recentBlockhash:s(),addressTableLookups:f(r(nt))})}),st=t({pubkey:x,signer:K(),writable:K(),source:f(I([w("transaction"),w("lookupTable")]))}),at=t({accountKeys:r(st),signatures:r(s())}),rt=t({parsed:te(),program:s(),programId:x}),it=t({accounts:r(x),data:s(),programId:x}),go=I([it,rt]),ko=I([t({parsed:te(),program:s(),programId:s()}),t({accounts:r(s()),data:s(),programId:s()})]),ct=ee(go,ko,o=>"accounts"in o?re(o,it):re(o,rt)),ut=t({signatures:r(s()),message:t({accountKeys:r(st),instructions:r(ct),recentBlockhash:s(),addressTableLookups:f(a(r(nt)))})}),ie=t({accountIndex:e(),mint:s(),owner:f(s()),uiTokenAmount:uo}),lt=t({writable:r(x),readonly:r(x)}),ue=t({err:$,fee:e(),innerInstructions:f(a(r(t({index:e(),instructions:r(t({accounts:r(e()),data:s(),programIdIndex:e()}))})))),preBalances:r(e()),postBalances:r(e()),logMessages:f(a(r(s()))),preTokenBalances:f(a(r(ie))),postTokenBalances:f(a(r(ie))),loadedAddresses:f(lt),computeUnitsConsumed:f(e())}),_e=t({err:$,fee:e(),innerInstructions:f(a(r(t({index:e(),instructions:r(ct)})))),preBalances:r(e()),postBalances:r(e()),logMessages:f(a(r(s()))),preTokenBalances:f(a(r(ie))),postTokenBalances:f(a(r(ie))),loadedAddresses:f(lt),computeUnitsConsumed:f(e())}),Z=I([w(0),w("legacy")]),U=t({pubkey:s(),lamports:e(),postBalance:a(e()),rewardType:a(s()),commission:f(a(e()))});g(a(t({blockhash:s(),previousBlockhash:s(),parentSlot:e(),transactions:r(t({transaction:Be,meta:a(ue),version:f(Z)})),rewards:f(r(U)),blockTime:a(e()),blockHeight:a(e())})));g(a(t({blockhash:s(),previousBlockhash:s(),parentSlot:e(),rewards:f(r(U)),blockTime:a(e()),blockHeight:a(e())})));g(a(t({blockhash:s(),previousBlockhash:s(),parentSlot:e(),transactions:r(t({transaction:at,meta:a(ue),version:f(Z)})),rewards:f(r(U)),blockTime:a(e()),blockHeight:a(e())})));g(a(t({blockhash:s(),previousBlockhash:s(),parentSlot:e(),transactions:r(t({transaction:ut,meta:a(_e),version:f(Z)})),rewards:f(r(U)),blockTime:a(e()),blockHeight:a(e())})));g(a(t({blockhash:s(),previousBlockhash:s(),parentSlot:e(),transactions:r(t({transaction:at,meta:a(_e),version:f(Z)})),rewards:f(r(U)),blockTime:a(e()),blockHeight:a(e())})));g(a(t({blockhash:s(),previousBlockhash:s(),parentSlot:e(),rewards:f(r(U)),blockTime:a(e()),blockHeight:a(e())})));g(a(t({blockhash:s(),previousBlockhash:s(),parentSlot:e(),transactions:r(t({transaction:Be,meta:a(ue)})),rewards:f(r(U)),blockTime:a(e())})));g(a(t({blockhash:s(),previousBlockhash:s(),parentSlot:e(),signatures:r(s()),blockTime:a(e())})));g(a(t({slot:e(),meta:ue,blockTime:f(a(e())),transaction:Be,version:f(Z)})));g(a(t({slot:e(),transaction:ut,meta:a(_e),blockTime:f(a(e())),version:f(Z)})));z(t({blockhash:s(),feeCalculator:t({lamportsPerSignature:e()})}));z(t({blockhash:s(),lastValidBlockHeight:e()}));z(K());const wo=t({slot:e(),numTransactions:e(),numSlots:e(),samplePeriodSecs:e()});g(r(wo));z(a(t({feeCalculator:t({lamportsPerSignature:e()})})));g(s());g(s());const So=t({err:$,logs:r(s()),signature:s()});t({result:ce(So),subscription:e()});Object.freeze({CreateLookupTable:{index:0,layout:l([c("instruction"),X("recentSlot"),v("bumpSeed")])},FreezeLookupTable:{index:1,layout:l([c("instruction")])},ExtendLookupTable:{index:2,layout:l([c("instruction"),X(),j(b(),Y(c(),-8),"addresses")])},DeactivateLookupTable:{index:3,layout:l([c("instruction")])},CloseLookupTable:{index:4,layout:l([c("instruction")])}});new h("AddressLookupTab1e1111111111111111111111111");Object.freeze({RequestUnits:{index:0,layout:l([v("instruction"),c("units"),c("additionalFee")])},RequestHeapFrame:{index:1,layout:l([v("instruction"),c("bytes")])},SetComputeUnitLimit:{index:2,layout:l([v("instruction"),c("units")])},SetComputeUnitPrice:{index:3,layout:l([v("instruction"),X("microLamports")])}});new h("ComputeBudget111111111111111111111111111111");l([v("numSignatures"),v("padding"),L("signatureOffset"),L("signatureInstructionIndex"),L("publicKeyOffset"),L("publicKeyInstructionIndex"),L("messageDataOffset"),L("messageDataSize"),L("messageInstructionIndex")]);new h("Ed25519SigVerify111111111111111111111111111");je.utils.isValidPrivateKey;je.getPublicKey;l([v("numSignatures"),L("signatureOffset"),v("signatureInstructionIndex"),L("ethAddressOffset"),v("ethAddressInstructionIndex"),L("messageDataOffset"),L("messageDataSize"),v("messageInstructionIndex"),D(20,"ethAddress"),D(64,"signature"),v("recoveryId")]);new h("KeccakSecp256k11111111111111111111111111111");var dt;new h("StakeConfig11111111111111111111111111111111");class ft{constructor(n,i,p){this.unixTimestamp=void 0,this.epoch=void 0,this.custodian=void 0,this.unixTimestamp=n,this.epoch=i,this.custodian=p}}dt=ft;ft.default=new dt(0,0,h.default);Object.freeze({Initialize:{index:0,layout:l([c("instruction"),Gt(),Mt()])},Authorize:{index:1,layout:l([c("instruction"),b("newAuthorized"),c("stakeAuthorizationType")])},Delegate:{index:2,layout:l([c("instruction")])},Split:{index:3,layout:l([c("instruction"),P("lamports")])},Withdraw:{index:4,layout:l([c("instruction"),P("lamports")])},Deactivate:{index:5,layout:l([c("instruction")])},Merge:{index:7,layout:l([c("instruction")])},AuthorizeWithSeed:{index:8,layout:l([c("instruction"),b("newAuthorized"),c("stakeAuthorizationType"),Q("authoritySeed"),b("authorityOwner")])}});Object.freeze({Staker:{index:0},Withdrawer:{index:1}});new h("Stake11111111111111111111111111111111111111");Object.freeze({InitializeAccount:{index:0,layout:l([c("instruction"),jt()])},Authorize:{index:1,layout:l([c("instruction"),b("newAuthorized"),c("voteAuthorizationType")])},Withdraw:{index:3,layout:l([c("instruction"),P("lamports")])},AuthorizeWithSeed:{index:10,layout:l([c("instruction"),Qt()])}});Object.freeze({Voter:{index:0},Withdrawer:{index:1}});new h("Vote111111111111111111111111111111111111111");new h("Va1idator1nfo111111111111111111111111111111");t({name:s(),website:f(s()),details:f(s()),keybaseUsername:f(s())});new h("Vote111111111111111111111111111111111111111");l([b("nodePubkey"),b("authorizedWithdrawer"),v("commission"),B(),j(l([B("slot"),c("confirmationCount")]),Y(c(),-8),"votes"),v("rootSlotValid"),B("rootSlot"),B(),j(l([B("epoch"),b("authorizedVoter")]),Y(c(),-8),"authorizedVoters"),l([j(l([b("authorizedPubkey"),B("epochOfLastAuthorizedSwitch"),B("targetEpoch")]),32,"buf"),B("idx"),v("isEmpty")],"priorVoters"),B(),j(l([B("epoch"),B("credits"),B("prevCredits")]),Y(c(),-8),"epochCredits"),l([B("slot"),B("timestamp")],"lastTimestamp")]);const He=o=>{const n=D(32,o),{encode:i,decode:p}=ve(n),d=n;return d.decode=(u,m)=>{const k=p(u,m);return new h(k)},d.encode=(u,m,k)=>{const S=u.toBuffer();return i(S,m,k)},d};class vo extends Error{constructor(n){super(n)}}class pt extends vo{constructor(){super(...arguments),this.name="TokenOwnerOffCurveError"}}const Ao=l([c("mintAuthorityOption"),He("mintAuthority"),Wt("supply"),v("decimals"),Vt("isInitialized"),c("freezeAuthorityOption"),He("freezeAuthority")]);Ao.span;async function xo(o,n,i=!1,p=W,d=V){if(!i&&!N.isOnCurve(n.toBuffer()))throw new pt;const[u]=await N.findProgramAddress([n.toBuffer(),p.toBuffer(),o.toBuffer()],d);return u}function De(o,n,i=!1,p=W,d=V){if(!i&&!N.isOnCurve(n.toBuffer()))throw new pt;const[u]=N.findProgramAddressSync([n.toBuffer(),p.toBuffer(),o.toBuffer()],d);return u}function Bo(o,n,i,p,d=W,u=V){return _o(o,n,i,p,M.Buffer.alloc(0),d,u)}function _o(o,n,i,p,d,u=W,m=V){const k=[{pubkey:o,isSigner:!0,isWritable:!0},{pubkey:n,isSigner:!1,isWritable:!0},{pubkey:i,isSigner:!1,isWritable:!1},{pubkey:p,isSigner:!1,isWritable:!1},{pubkey:Qe.programId,isSigner:!1,isWritable:!1},{pubkey:u,isSigner:!1,isWritable:!1}];return new vt({keys:k,programId:m,data:d})}async function $o(o){At.create({message:"Copied!"}),await navigator.clipboard.writeText(o)}var Uo=Ye({name:"QBtnGroup",props:{unelevated:Boolean,outline:Boolean,flat:Boolean,rounded:Boolean,square:Boolean,push:Boolean,stretch:Boolean,glossy:Boolean,spread:Boolean},setup(o,{slots:n}){const i=xt(()=>{const p=["unelevated","outline","flat","rounded","square","push","stretch","glossy"].filter(d=>o[d]===!0).map(d=>`q-btn-group--${d}`).join(" ");return`q-btn-group row no-wrap${p.length!==0?" "+p:""}`+(o.spread===!0?" q-btn-group--spread":" inline")});return()=>Je("div",{class:i.value},Bt(n.default))}});const To=Je("div",{class:"q-space"});var Fo=Ye({name:"QSpace",setup(){return()=>To}}),Io=(o,n)=>{const i=o.__vccOpts||o;for(const[p,d]of n)i[p]=d;return i};const Ro={props:{text:{type:String,required:!0},search:{type:String,required:!0}},computed:{highlighted(){if(!this.search)return this.address;const o=this.search.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),n=new RegExp(`(${o})`,"gi");return this.text.replace(n,'<span style="color: coral; font-weight: bold;">$1</span>')}}},Co={key:0},Po=["innerHTML"];function zo(o,n,i,p,d,u){return J(),ne("div",null,[i.search?(J(),ne("span",{key:1,innerHTML:u.highlighted},null,8,Po)):(J(),ne("span",Co,be(i.text),1))])}var he=Io(Ro,[["render",zo]]);const Eo={class:"row items-center q-gutter-x-sm no-wrap"},Lo={class:"row"},Oo={class:""},Ko={class:"row q-gutter-x-sm"},qo={class:"col text-right"},Go={__name:"TokenSelectInput",props:["label","dense","init_value","show_only_available"],emits:["token_change"],setup(o,{emit:n}){const i=n,p=o,d=de(p.init_value),u=de(fe().token_list);_t(()=>d.value,()=>{i("token_change",d.value)});function m(E,q){setTimeout(()=>{q(()=>{if(E==="")u.value=fe().token_list;else{const y=E.toLowerCase();u.value=fe().token_list.filter(R=>R.name.toLowerCase().indexOf(y.toLowerCase())>-1||R.address.toLowerCase().indexOf(y.toLowerCase())>-1||R.symbol.toLowerCase().indexOf(y.toLowerCase())>-1)}p.show_only_available&&(u.value=u.value.filter(y=>{var R;return((R=Ke().accounts.find(F=>F.account.data.parsed.info.mint.toString()==y.address.toString()))==null?void 0:R.account.data.parsed.info.tokenAmount.uiAmount)>0}))},y=>{E!==""&&y.options.length>0&&(y.setOptionIndex(-1),y.moveOptionSelection(1,!0))})},300)}function k(){}const S=de();return(E,q)=>(J(),Xe(Kt,{label:p.label??"Token",square:"",filled:"",modelValue:d.value,"onUpdate:modelValue":q[0]||(q[0]=y=>d.value=y),onInputValue:q[1]||(q[1]=y=>S.value=y),"input-debounce":"0","use-input":"",clearable:"",behavior:"dialog",options:u.value,dense:o.dense,onFilter:m,onFilterAbort:k},{selected:T(()=>{var y;return[G("div",Eo,[G("div",null,be(((y=d.value)==null?void 0:y.name)??""),1)])]}),option:T(y=>[_(qe,Tt(It(y.itemProps)),{default:T(()=>[_(pe,{avatar:""},{default:T(()=>[_(Ot,{src:y.opt.logoURI},null,8,["src"])]),_:2},1024),_(pe,null,{default:T(()=>[G("div",Lo,[G("div",Oo,[_(oe,null,{default:T(()=>[G("div",Ko,[_(he,{search:S.value,text:y.opt.name.toString()},null,8,["search","text"]),_(he,{search:S.value,text:"["+y.opt.symbol.toString()+"]"},null,8,["search","text"])])]),_:2},1024),_(oe,{caption:"",class:"overflow-auto"},{default:T(()=>[_(he,{search:S.value,text:y.opt.address.toString()},null,8,["search","text"])]),_:2},1024)]),G("div",qo,[_(oe,{caption:""},{default:T(()=>[se("Available")]),_:1}),_(oe,null,{default:T(()=>{var R;return[se(be(((R=ye(Ke)().accounts.find(F=>F.account.data.parsed.info.mint.toString()==y.opt.address.toString()))==null?void 0:R.account.data.parsed.info.tokenAmount.uiAmount)??"-"),1)]}),_:2},1024)])])]),_:2},1024)]),_:2},1040)]),"no-option":T(()=>[_(qe,null,{default:T(()=>[_(pe,{class:"text-grey"},{default:T(()=>[se(" No results ")]),_:1})]),_:1})]),_:1},8,["label","modelValue","options","dense"]))}};async function $e(o,n){const i=await xo(o,n,!1,W,V);return await ge().connection.getAccountInfo(i)===null?(console.log("Associated token account does NOT exist:",i.toString()),!1):(console.log("Associated token account exists:",i.toString()),!0)}function Ue(o,n){return Bo(O().publicKey.value,o,O().publicKey.value,n)}async function No(o,n,i="finalized"){const p=await o.getLatestBlockhash();return await o.confirmTransaction({blockhash:p.blockhash,lastValidBlockHeight:p.lastValidBlockHeight,signature:n})}const Wo={key:0,class:"row justify-center bg-secondary"},Mo=Rt({__name:"CancelEscrowAction",props:["label","escrow_address"],setup(o){const n=Ct(),i=o;async function p(){var k,S,E,q,y,R,F,Te,Ie;const d=Lt(),{sendTransaction:u}=O(),m=d==null?void 0:d.pg_escrow;setTimeout(()=>{n.notify({group:!1,spinner:!0,message:"Waiting for user to sign..."})},2e3);try{let H=new zt;i.escrow_address&&await C().load_escrow(new N(i.escrow_address));const Vo=await(m==null?void 0:m.value.account.escrow.fetch(((k=C().escrow_selected)==null?void 0:k.publicKey)??"")),mt=C().escrow_selected.account.seed,le=N.findProgramAddressSync([M.Buffer.from("escrow"),O().publicKey.value.toBytes(),mt.toArrayLike(M.Buffer).reverse()],m==null?void 0:m.value.programId)[0],ht=N.findProgramAddressSync([M.Buffer.from("vault"),le.toBuffer()],m==null?void 0:m.value.programId)[0],bt=N.findProgramAddressSync([M.Buffer.from("auth"),le.toBuffer()],m==null?void 0:m.value.programId)[0],Re=De((S=C().escrow_selected)==null?void 0:S.account.depositToken,O().publicKey.value,void 0,W,V);await $e((E=C().escrow_selected)==null?void 0:E.account.depositToken,O().publicKey.value)||H.add(Ue(Re,new N((q=C().escrow_selected)==null?void 0:q.account.depositToken)));const Ce=De((y=C().escrow_selected)==null?void 0:y.account.requestToken,O().publicKey.value,void 0,W,V);await $e((R=C().escrow_selected)==null?void 0:R.account.requestToken,O().publicKey.value)||H.add(Ue(Ce,(F=C().escrow_selected)==null?void 0:F.account.requestToken));let Pe=await(m==null?void 0:m.value.methods.cancel().accounts({maker:O().publicKey.value,makerAta:Re,depositToken:(Te=C().escrow_selected)==null?void 0:Te.account.depositToken,makerAtaRequest:Ce,makerTokenRequest:(Ie=C().escrow_selected)==null?void 0:Ie.account.requestToken,auth:bt,escrow:le,vault:ht,tokenProgram:W,associatedTokenProgram:V,systemProgram:Qe.programId}).transaction());Pe&&H.add(await Pe);const ze=await u(H,ge().connection);await No(ge().connection,ze),console.log(ze),n.notify({type:"positive",icon:"done",spinner:!1,message:"Transaction confirmed!",timeout:2500}),await C().load_all_escrows()}catch(H){console.error(H),n.notify({type:"negative",icon:"error",spinner:!1,message:H.toString(),timeout:5e3})}}return(d,u)=>ye(O)().publicKey.value?(J(),Xe(Pt,{key:1,onClick:u[0]||(u[0]=m=>p().then(()=>{})),dense:"",label:i.label,color:"secondary",icon:"highlight_off"},{default:T(()=>[_(qt,null,{default:T(()=>[se(" Cancel/Close escrow ")]),_:1})]),_:1},8,["label"])):(J(),ne("div",Wo,[_(ye(Et),{dark:""})]))}});export{Uo as Q,Go as _,$e as a,Fo as b,$o as c,Mo as d,De as g,Ue as m,No as w};