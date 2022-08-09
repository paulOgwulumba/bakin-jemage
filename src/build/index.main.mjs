// Automatically generated with Reach 0.1.11 (6e495417)
/* eslint-disable */
export const _version = '0.1.11';
export const _versionHash = '0.1.11 (6e495417)';
export const _backendVersion = 18;

export function getExports(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getEvents(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getViews(s, viewlib) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_UInt;
  const ctc2 = stdlib.T_Bool;
  
  return {
    infos: {
      },
    views: {
      1: [ctc0, ctc1, ctc1, ctc1],
      5: [ctc0, ctc1, ctc1, ctc0, ctc1, ctc2, ctc1],
      7: [ctc0, ctc1, ctc1, ctc0, ctc1, ctc1, ctc1]
      }
    };
  
  };
export function _getMaps(s) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Tuple([]);
  return {
    mapDataTy: ctc0
    };
  };
export async function Alice(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Alice expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Alice expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_UInt;
  const ctc1 = stdlib.T_Null;
  const ctc2 = stdlib.T_Address;
  const ctc3 = stdlib.T_Bool;
  
  
  const v232 = stdlib.protect(ctc0, interact.deadline, 'for Alice\'s interact field deadline');
  const v233 = stdlib.protect(ctc0, interact.wager, 'for Alice\'s interact field wager');
  
  const txn1 = await (ctc.sendrecv({
    args: [v233, v232],
    evt_cnt: 2,
    funcNum: 0,
    lct: stdlib.checkedBigNumberify('./index.rsh:85:6:dot', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc0, ctc0],
    pay: [v233, []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v237, v238], secs: v240, time: v239, didSend: v31, from: v236 } = txn1;
      
      sim_r.txns.push({
        amt: v237,
        kind: 'to',
        tok: undefined /* Nothing */
        });
      const v249 = stdlib.add(v239, v238);
      sim_r.isHalt = false;
      
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [ctc0, ctc0],
    waitIfNotPresent: false
    }));
  const {data: [v237, v238], secs: v240, time: v239, didSend: v31, from: v236 } = txn1;
  ;
  const v249 = stdlib.add(v239, v238);
  const txn2 = await (ctc.recv({
    didSend: false,
    evt_cnt: 0,
    funcNum: 1,
    out_tys: [],
    timeoutAt: ['time', v249],
    waitIfNotPresent: false
    }));
  if (txn2.didTimeout) {
    const txn3 = await (ctc.sendrecv({
      args: [v236, v237, v238, v249],
      evt_cnt: 0,
      funcNum: 2,
      lct: v239,
      onlyIf: true,
      out_tys: [],
      pay: [stdlib.checkedBigNumberify('reach standard library:200:11:decimal', stdlib.UInt_max, '0'), []],
      sim_p: (async (txn3) => {
        const sim_r = { txns: [], mapRefs: [], maps: [] };
        let sim_txn_ctr = stdlib.UInt_max;
        const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
        
        
        const {data: [], secs: v375, time: v374, didSend: v198, from: v373 } = txn3;
        
        ;
        sim_r.txns.push({
          kind: 'from',
          to: v236,
          tok: undefined /* Nothing */
          });
        sim_r.txns.push({
          kind: 'halt',
          tok: undefined /* Nothing */
          })
        sim_r.isHalt = true;
        
        return sim_r;
        }),
      soloSend: false,
      timeoutAt: undefined /* mto */,
      tys: [ctc2, ctc0, ctc0, ctc0],
      waitIfNotPresent: false
      }));
    const {data: [], secs: v375, time: v374, didSend: v198, from: v373 } = txn3;
    ;
    ;
    stdlib.protect(ctc1, await interact.informTimeout(), {
      at: './index.rsh:44:29:application',
      fs: ['at ./index.rsh:43:9:application call to [unknown function] (defined at: ./index.rsh:43:27:function exp)', 'at reach standard library:203:8:application call to "after" (defined at: ./index.rsh:42:28:function exp)', 'at ./index.rsh:93:51:application call to "closeTo" (defined at: reach standard library:198:8:function exp)'],
      msg: 'informTimeout',
      who: 'Alice'
      });
    
    return;
    
    }
  else {
    const {data: [], secs: v255, time: v254, didSend: v40, from: v253 } = txn2;
    const v257 = stdlib.add(v237, v237);
    ;
    stdlib.protect(ctc1, await interact.informOfJoiner(), {
      at: './index.rsh:95:32:application',
      fs: ['at ./index.rsh:95:32:application call to [unknown function] (defined at: ./index.rsh:95:32:function exp)', 'at ./index.rsh:95:32:application call to "liftedInteract" (defined at: ./index.rsh:95:32:application)'],
      msg: 'informOfJoiner',
      who: 'Alice'
      });
    
    let v259 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '2');
    let v260 = v254;
    let v267 = v257;
    
    while (await (async () => {
      const v275 = stdlib.eq(v259, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '2'));
      const v276 = stdlib.eq(v259, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '4'));
      const v277 = v275 ? true : v276;
      
      return v277;})()) {
      const v278 = stdlib.eq(v259, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '4'));
      const v285 = stdlib.add(v260, v238);
      if (v278) {
        stdlib.protect(ctc1, await interact.informDraw(), {
          at: './index.rsh:74:26:application',
          fs: ['at ./index.rsh:73:9:application call to [unknown function] (defined at: ./index.rsh:73:27:function exp)', 'at ./index.rsh:105:17:application call to "informDraw" (defined at: ./index.rsh:72:25:function exp)'],
          msg: 'informDraw',
          who: 'Alice'
          });
        
        }
      else {
        }
      const txn3 = await (ctc.recv({
        didSend: false,
        evt_cnt: 1,
        funcNum: 4,
        out_tys: [ctc0],
        timeoutAt: ['time', v285],
        waitIfNotPresent: false
        }));
      if (txn3.didTimeout) {
        const txn4 = await (ctc.sendrecv({
          args: [v236, v237, v238, v253, v267, v278, v285],
          evt_cnt: 0,
          funcNum: 5,
          lct: v260,
          onlyIf: true,
          out_tys: [],
          pay: [stdlib.checkedBigNumberify('reach standard library:200:11:decimal', stdlib.UInt_max, '0'), []],
          sim_p: (async (txn4) => {
            const sim_r = { txns: [], mapRefs: [], maps: [] };
            let sim_txn_ctr = stdlib.UInt_max;
            const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
            
            
            const {data: [], secs: v341, time: v340, didSend: v151, from: v339 } = txn4;
            
            ;
            sim_r.txns.push({
              kind: 'from',
              to: v236,
              tok: undefined /* Nothing */
              });
            sim_r.txns.push({
              kind: 'halt',
              tok: undefined /* Nothing */
              })
            sim_r.isHalt = true;
            
            return sim_r;
            }),
          soloSend: false,
          timeoutAt: undefined /* mto */,
          tys: [ctc2, ctc0, ctc0, ctc2, ctc0, ctc3, ctc0],
          waitIfNotPresent: false
          }));
        const {data: [], secs: v341, time: v340, didSend: v151, from: v339 } = txn4;
        ;
        const v342 = stdlib.addressEq(v236, v339);
        const v343 = stdlib.addressEq(v253, v339);
        const v344 = v342 ? true : v343;
        stdlib.assert(v344, {
          at: 'reach standard library:200:11:dot',
          fs: ['at ./index.rsh:113:53:application call to "closeTo" (defined at: reach standard library:198:8:function exp)'],
          msg: 'sender correct',
          who: 'Alice'
          });
        ;
        stdlib.protect(ctc1, await interact.informTimeout(), {
          at: './index.rsh:44:29:application',
          fs: ['at ./index.rsh:43:9:application call to [unknown function] (defined at: ./index.rsh:43:27:function exp)', 'at reach standard library:203:8:application call to "after" (defined at: ./index.rsh:42:28:function exp)', 'at ./index.rsh:113:53:application call to "closeTo" (defined at: reach standard library:198:8:function exp)'],
          msg: 'informTimeout',
          who: 'Alice'
          });
        
        return;
        
        }
      else {
        const {data: [v296], secs: v298, time: v297, didSend: v76, from: v295 } = txn3;
        ;
        const v299 = stdlib.addressEq(v253, v295);
        stdlib.assert(v299, {
          at: './index.rsh:112:9:dot',
          fs: [],
          msg: 'sender correct',
          who: 'Alice'
          });
        const v306 = stdlib.add(v297, v238);
        const v310 = stdlib.protect(ctc0, await interact.getNumberOfMoves(), {
          at: './index.rsh:117:67:application',
          fs: ['at ./index.rsh:116:15:application call to [unknown function] (defined at: ./index.rsh:116:19:function exp)'],
          msg: 'getNumberOfMoves',
          who: 'Alice'
          });
        
        const txn4 = await (ctc.sendrecv({
          args: [v236, v237, v238, v253, v267, v296, v306, v310],
          evt_cnt: 1,
          funcNum: 6,
          lct: v297,
          onlyIf: true,
          out_tys: [ctc0],
          pay: [stdlib.checkedBigNumberify('./index.rsh:119:11:decimal', stdlib.UInt_max, '0'), []],
          sim_p: (async (txn4) => {
            const sim_r = { txns: [], mapRefs: [], maps: [] };
            let sim_txn_ctr = stdlib.UInt_max;
            const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
            
            
            const {data: [v312], secs: v314, time: v313, didSend: v86, from: v311 } = txn4;
            
            ;
            
            let v318;
            const v319 = stdlib.gt(v312, v296);
            if (v319) {
              v318 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '1');
              }
            else {
              const v320 = stdlib.lt(v312, v296);
              if (v320) {
                v318 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '0');
                }
              else {
                v318 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '4');
                }
              }
            const cv259 = v318;
            const cv260 = v313;
            const cv267 = v267;
            
            await (async () => {
              const v259 = cv259;
              const v260 = cv260;
              const v267 = cv267;
              
              if (await (async () => {
                const v275 = stdlib.eq(v259, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '2'));
                const v276 = stdlib.eq(v259, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '4'));
                const v277 = v275 ? true : v276;
                
                return v277;})()) {
                const v278 = stdlib.eq(v259, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '4'));
                const v285 = stdlib.add(v260, v238);
                sim_r.isHalt = false;
                }
              else {
                const v357 = stdlib.mul(stdlib.checkedBigNumberify('./index.rsh:132:12:decimal', stdlib.UInt_max, '2'), v237);
                const v358 = stdlib.eq(v259, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '0'));
                const v359 = v358 ? v236 : v253;
                sim_r.txns.push({
                  kind: 'from',
                  to: v359,
                  tok: undefined /* Nothing */
                  });
                
                sim_r.txns.push({
                  kind: 'halt',
                  tok: undefined /* Nothing */
                  })
                sim_r.isHalt = true;
                }})();
            return sim_r;
            }),
          soloSend: true,
          timeoutAt: ['time', v306],
          tys: [ctc2, ctc0, ctc0, ctc2, ctc0, ctc0, ctc0, ctc0],
          waitIfNotPresent: false
          }));
        if (txn4.didTimeout) {
          const txn5 = await (ctc.sendrecv({
            args: [v236, v237, v238, v253, v267, v296, v306],
            evt_cnt: 0,
            funcNum: 7,
            lct: v297,
            onlyIf: true,
            out_tys: [],
            pay: [stdlib.checkedBigNumberify('reach standard library:200:11:decimal', stdlib.UInt_max, '0'), []],
            sim_p: (async (txn5) => {
              const sim_r = { txns: [], mapRefs: [], maps: [] };
              let sim_txn_ctr = stdlib.UInt_max;
              const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
              
              
              const {data: [], secs: v323, time: v322, didSend: v117, from: v321 } = txn5;
              
              ;
              sim_r.txns.push({
                kind: 'from',
                to: v253,
                tok: undefined /* Nothing */
                });
              sim_r.txns.push({
                kind: 'halt',
                tok: undefined /* Nothing */
                })
              sim_r.isHalt = true;
              
              return sim_r;
              }),
            soloSend: false,
            timeoutAt: undefined /* mto */,
            tys: [ctc2, ctc0, ctc0, ctc2, ctc0, ctc0, ctc0],
            waitIfNotPresent: false
            }));
          const {data: [], secs: v323, time: v322, didSend: v117, from: v321 } = txn5;
          ;
          const v324 = stdlib.addressEq(v236, v321);
          const v325 = stdlib.addressEq(v253, v321);
          const v326 = v324 ? true : v325;
          stdlib.assert(v326, {
            at: 'reach standard library:200:11:dot',
            fs: ['at ./index.rsh:120:53:application call to "closeTo" (defined at: reach standard library:198:8:function exp)'],
            msg: 'sender correct',
            who: 'Alice'
            });
          ;
          stdlib.protect(ctc1, await interact.informTimeout(), {
            at: './index.rsh:44:29:application',
            fs: ['at ./index.rsh:43:9:application call to [unknown function] (defined at: ./index.rsh:43:27:function exp)', 'at reach standard library:203:8:application call to "after" (defined at: ./index.rsh:42:28:function exp)', 'at ./index.rsh:120:53:application call to "closeTo" (defined at: reach standard library:198:8:function exp)'],
            msg: 'informTimeout',
            who: 'Alice'
            });
          
          return;
          
          }
        else {
          const {data: [v312], secs: v314, time: v313, didSend: v86, from: v311 } = txn4;
          ;
          const v315 = stdlib.addressEq(v236, v311);
          stdlib.assert(v315, {
            at: './index.rsh:119:11:dot',
            fs: [],
            msg: 'sender correct',
            who: 'Alice'
            });
          stdlib.protect(ctc1, await interact.getOpponentResult(v296), {
            at: './index.rsh:124:37:application',
            fs: ['at ./index.rsh:124:37:application call to [unknown function] (defined at: ./index.rsh:124:37:function exp)', 'at ./index.rsh:124:37:application call to "liftedInteract" (defined at: ./index.rsh:124:37:application)'],
            msg: 'getOpponentResult',
            who: 'Alice'
            });
          
          let v318;
          const v319 = stdlib.gt(v312, v296);
          if (v319) {
            v318 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '1');
            }
          else {
            const v320 = stdlib.lt(v312, v296);
            if (v320) {
              v318 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '0');
              }
            else {
              v318 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '4');
              }
            }
          const cv259 = v318;
          const cv260 = v313;
          const cv267 = v267;
          
          v259 = cv259;
          v260 = cv260;
          v267 = cv267;
          
          continue;}
        
        }
      
      }
    const v357 = stdlib.mul(stdlib.checkedBigNumberify('./index.rsh:132:12:decimal', stdlib.UInt_max, '2'), v237);
    const v358 = stdlib.eq(v259, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '0'));
    const v359 = v358 ? v236 : v253;
    ;
    stdlib.protect(ctc1, await interact.declareWinner(v259), {
      at: './index.rsh:51:31:application',
      fs: ['at ./index.rsh:49:9:application call to [unknown function] (defined at: ./index.rsh:49:27:function exp)', 'at ./index.rsh:133:17:application call to "announceWinner" (defined at: ./index.rsh:48:40:function exp)'],
      msg: 'declareWinner',
      who: 'Alice'
      });
    
    return;
    }
  
  
  
  };
export async function Bob(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Bob expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Bob expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_UInt;
  const ctc1 = stdlib.T_Null;
  const ctc2 = stdlib.T_Address;
  const ctc3 = stdlib.T_Bool;
  
  
  const txn1 = await (ctc.recv({
    didSend: false,
    evt_cnt: 2,
    funcNum: 0,
    out_tys: [ctc0, ctc0],
    timeoutAt: undefined /* mto */,
    waitIfNotPresent: false
    }));
  const {data: [v237, v238], secs: v240, time: v239, didSend: v31, from: v236 } = txn1;
  ;
  const v249 = stdlib.add(v239, v238);
  stdlib.protect(ctc1, await interact.acceptWager(v237), {
    at: './index.rsh:90:25:application',
    fs: ['at ./index.rsh:89:11:application call to [unknown function] (defined at: ./index.rsh:89:15:function exp)'],
    msg: 'acceptWager',
    who: 'Bob'
    });
  
  const txn2 = await (ctc.sendrecv({
    args: [v236, v237, v238, v249],
    evt_cnt: 0,
    funcNum: 1,
    lct: v239,
    onlyIf: true,
    out_tys: [],
    pay: [v237, []],
    sim_p: (async (txn2) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [], secs: v255, time: v254, didSend: v40, from: v253 } = txn2;
      
      const v257 = stdlib.add(v237, v237);
      sim_r.txns.push({
        amt: v237,
        kind: 'to',
        tok: undefined /* Nothing */
        });
      const v259 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '2');
      const v260 = v254;
      const v267 = v257;
      
      if (await (async () => {
        const v275 = stdlib.eq(v259, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '2'));
        const v276 = stdlib.eq(v259, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '4'));
        const v277 = v275 ? true : v276;
        
        return v277;})()) {
        const v278 = stdlib.eq(v259, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '4'));
        const v285 = stdlib.add(v260, v238);
        sim_r.isHalt = false;
        }
      else {
        const v357 = stdlib.mul(stdlib.checkedBigNumberify('./index.rsh:132:12:decimal', stdlib.UInt_max, '2'), v237);
        const v358 = stdlib.eq(v259, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '0'));
        const v359 = v358 ? v236 : v253;
        sim_r.txns.push({
          kind: 'from',
          to: v359,
          tok: undefined /* Nothing */
          });
        
        sim_r.txns.push({
          kind: 'halt',
          tok: undefined /* Nothing */
          })
        sim_r.isHalt = true;
        }
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: ['time', v249],
    tys: [ctc2, ctc0, ctc0, ctc0],
    waitIfNotPresent: false
    }));
  if (txn2.didTimeout) {
    const txn3 = await (ctc.sendrecv({
      args: [v236, v237, v238, v249],
      evt_cnt: 0,
      funcNum: 2,
      lct: v239,
      onlyIf: true,
      out_tys: [],
      pay: [stdlib.checkedBigNumberify('reach standard library:200:11:decimal', stdlib.UInt_max, '0'), []],
      sim_p: (async (txn3) => {
        const sim_r = { txns: [], mapRefs: [], maps: [] };
        let sim_txn_ctr = stdlib.UInt_max;
        const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
        
        
        const {data: [], secs: v375, time: v374, didSend: v198, from: v373 } = txn3;
        
        ;
        sim_r.txns.push({
          kind: 'from',
          to: v236,
          tok: undefined /* Nothing */
          });
        sim_r.txns.push({
          kind: 'halt',
          tok: undefined /* Nothing */
          })
        sim_r.isHalt = true;
        
        return sim_r;
        }),
      soloSend: false,
      timeoutAt: undefined /* mto */,
      tys: [ctc2, ctc0, ctc0, ctc0],
      waitIfNotPresent: false
      }));
    const {data: [], secs: v375, time: v374, didSend: v198, from: v373 } = txn3;
    ;
    ;
    stdlib.protect(ctc1, await interact.informTimeout(), {
      at: './index.rsh:44:29:application',
      fs: ['at ./index.rsh:43:9:application call to [unknown function] (defined at: ./index.rsh:43:27:function exp)', 'at reach standard library:203:8:application call to "after" (defined at: ./index.rsh:42:28:function exp)', 'at ./index.rsh:93:51:application call to "closeTo" (defined at: reach standard library:198:8:function exp)'],
      msg: 'informTimeout',
      who: 'Bob'
      });
    
    return;
    
    }
  else {
    const {data: [], secs: v255, time: v254, didSend: v40, from: v253 } = txn2;
    const v257 = stdlib.add(v237, v237);
    ;
    let v259 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '2');
    let v260 = v254;
    let v267 = v257;
    
    while (await (async () => {
      const v275 = stdlib.eq(v259, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '2'));
      const v276 = stdlib.eq(v259, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '4'));
      const v277 = v275 ? true : v276;
      
      return v277;})()) {
      const v278 = stdlib.eq(v259, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '4'));
      const v285 = stdlib.add(v260, v238);
      if (v278) {
        stdlib.protect(ctc1, await interact.informDraw(), {
          at: './index.rsh:74:26:application',
          fs: ['at ./index.rsh:73:9:application call to [unknown function] (defined at: ./index.rsh:73:27:function exp)', 'at ./index.rsh:105:17:application call to "informDraw" (defined at: ./index.rsh:72:25:function exp)'],
          msg: 'informDraw',
          who: 'Bob'
          });
        
        }
      else {
        }
      const v294 = stdlib.protect(ctc0, await interact.getNumberOfMoves(), {
        at: './index.rsh:109:65:application',
        fs: ['at ./index.rsh:108:13:application call to [unknown function] (defined at: ./index.rsh:108:17:function exp)'],
        msg: 'getNumberOfMoves',
        who: 'Bob'
        });
      
      const txn3 = await (ctc.sendrecv({
        args: [v236, v237, v238, v253, v267, v278, v285, v294],
        evt_cnt: 1,
        funcNum: 4,
        lct: v260,
        onlyIf: true,
        out_tys: [ctc0],
        pay: [stdlib.checkedBigNumberify('./index.rsh:112:9:decimal', stdlib.UInt_max, '0'), []],
        sim_p: (async (txn3) => {
          const sim_r = { txns: [], mapRefs: [], maps: [] };
          let sim_txn_ctr = stdlib.UInt_max;
          const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
          
          
          const {data: [v296], secs: v298, time: v297, didSend: v76, from: v295 } = txn3;
          
          ;
          const v306 = stdlib.add(v297, v238);
          sim_r.isHalt = false;
          
          return sim_r;
          }),
        soloSend: true,
        timeoutAt: ['time', v285],
        tys: [ctc2, ctc0, ctc0, ctc2, ctc0, ctc3, ctc0, ctc0],
        waitIfNotPresent: false
        }));
      if (txn3.didTimeout) {
        const txn4 = await (ctc.sendrecv({
          args: [v236, v237, v238, v253, v267, v278, v285],
          evt_cnt: 0,
          funcNum: 5,
          lct: v260,
          onlyIf: true,
          out_tys: [],
          pay: [stdlib.checkedBigNumberify('reach standard library:200:11:decimal', stdlib.UInt_max, '0'), []],
          sim_p: (async (txn4) => {
            const sim_r = { txns: [], mapRefs: [], maps: [] };
            let sim_txn_ctr = stdlib.UInt_max;
            const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
            
            
            const {data: [], secs: v341, time: v340, didSend: v151, from: v339 } = txn4;
            
            ;
            sim_r.txns.push({
              kind: 'from',
              to: v236,
              tok: undefined /* Nothing */
              });
            sim_r.txns.push({
              kind: 'halt',
              tok: undefined /* Nothing */
              })
            sim_r.isHalt = true;
            
            return sim_r;
            }),
          soloSend: false,
          timeoutAt: undefined /* mto */,
          tys: [ctc2, ctc0, ctc0, ctc2, ctc0, ctc3, ctc0],
          waitIfNotPresent: false
          }));
        const {data: [], secs: v341, time: v340, didSend: v151, from: v339 } = txn4;
        ;
        const v342 = stdlib.addressEq(v236, v339);
        const v343 = stdlib.addressEq(v253, v339);
        const v344 = v342 ? true : v343;
        stdlib.assert(v344, {
          at: 'reach standard library:200:11:dot',
          fs: ['at ./index.rsh:113:53:application call to "closeTo" (defined at: reach standard library:198:8:function exp)'],
          msg: 'sender correct',
          who: 'Bob'
          });
        ;
        stdlib.protect(ctc1, await interact.informTimeout(), {
          at: './index.rsh:44:29:application',
          fs: ['at ./index.rsh:43:9:application call to [unknown function] (defined at: ./index.rsh:43:27:function exp)', 'at reach standard library:203:8:application call to "after" (defined at: ./index.rsh:42:28:function exp)', 'at ./index.rsh:113:53:application call to "closeTo" (defined at: reach standard library:198:8:function exp)'],
          msg: 'informTimeout',
          who: 'Bob'
          });
        
        return;
        
        }
      else {
        const {data: [v296], secs: v298, time: v297, didSend: v76, from: v295 } = txn3;
        ;
        const v299 = stdlib.addressEq(v253, v295);
        stdlib.assert(v299, {
          at: './index.rsh:112:9:dot',
          fs: [],
          msg: 'sender correct',
          who: 'Bob'
          });
        const v306 = stdlib.add(v297, v238);
        const txn4 = await (ctc.recv({
          didSend: false,
          evt_cnt: 1,
          funcNum: 6,
          out_tys: [ctc0],
          timeoutAt: ['time', v306],
          waitIfNotPresent: false
          }));
        if (txn4.didTimeout) {
          const txn5 = await (ctc.sendrecv({
            args: [v236, v237, v238, v253, v267, v296, v306],
            evt_cnt: 0,
            funcNum: 7,
            lct: v297,
            onlyIf: true,
            out_tys: [],
            pay: [stdlib.checkedBigNumberify('reach standard library:200:11:decimal', stdlib.UInt_max, '0'), []],
            sim_p: (async (txn5) => {
              const sim_r = { txns: [], mapRefs: [], maps: [] };
              let sim_txn_ctr = stdlib.UInt_max;
              const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
              
              
              const {data: [], secs: v323, time: v322, didSend: v117, from: v321 } = txn5;
              
              ;
              sim_r.txns.push({
                kind: 'from',
                to: v253,
                tok: undefined /* Nothing */
                });
              sim_r.txns.push({
                kind: 'halt',
                tok: undefined /* Nothing */
                })
              sim_r.isHalt = true;
              
              return sim_r;
              }),
            soloSend: false,
            timeoutAt: undefined /* mto */,
            tys: [ctc2, ctc0, ctc0, ctc2, ctc0, ctc0, ctc0],
            waitIfNotPresent: false
            }));
          const {data: [], secs: v323, time: v322, didSend: v117, from: v321 } = txn5;
          ;
          const v324 = stdlib.addressEq(v236, v321);
          const v325 = stdlib.addressEq(v253, v321);
          const v326 = v324 ? true : v325;
          stdlib.assert(v326, {
            at: 'reach standard library:200:11:dot',
            fs: ['at ./index.rsh:120:53:application call to "closeTo" (defined at: reach standard library:198:8:function exp)'],
            msg: 'sender correct',
            who: 'Bob'
            });
          ;
          stdlib.protect(ctc1, await interact.informTimeout(), {
            at: './index.rsh:44:29:application',
            fs: ['at ./index.rsh:43:9:application call to [unknown function] (defined at: ./index.rsh:43:27:function exp)', 'at reach standard library:203:8:application call to "after" (defined at: ./index.rsh:42:28:function exp)', 'at ./index.rsh:120:53:application call to "closeTo" (defined at: reach standard library:198:8:function exp)'],
            msg: 'informTimeout',
            who: 'Bob'
            });
          
          return;
          
          }
        else {
          const {data: [v312], secs: v314, time: v313, didSend: v86, from: v311 } = txn4;
          ;
          const v315 = stdlib.addressEq(v236, v311);
          stdlib.assert(v315, {
            at: './index.rsh:119:11:dot',
            fs: [],
            msg: 'sender correct',
            who: 'Bob'
            });
          stdlib.protect(ctc1, await interact.getOpponentResult(v312), {
            at: './index.rsh:125:35:application',
            fs: ['at ./index.rsh:125:35:application call to [unknown function] (defined at: ./index.rsh:125:35:function exp)', 'at ./index.rsh:125:35:application call to "liftedInteract" (defined at: ./index.rsh:125:35:application)'],
            msg: 'getOpponentResult',
            who: 'Bob'
            });
          
          let v318;
          const v319 = stdlib.gt(v312, v296);
          if (v319) {
            v318 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '1');
            }
          else {
            const v320 = stdlib.lt(v312, v296);
            if (v320) {
              v318 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '0');
              }
            else {
              v318 = stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '4');
              }
            }
          const cv259 = v318;
          const cv260 = v313;
          const cv267 = v267;
          
          v259 = cv259;
          v260 = cv260;
          v267 = cv267;
          
          continue;}
        
        }
      
      }
    const v357 = stdlib.mul(stdlib.checkedBigNumberify('./index.rsh:132:12:decimal', stdlib.UInt_max, '2'), v237);
    const v358 = stdlib.eq(v259, stdlib.checkedBigNumberify('./index.rsh:makeEnum', stdlib.UInt_max, '0'));
    const v359 = v358 ? v236 : v253;
    ;
    stdlib.protect(ctc1, await interact.declareWinner(v259), {
      at: '<builtin>',
      fs: ['at ./index.rsh:49:9:application call to [unknown function] (defined at: ./index.rsh:49:27:function exp)', 'at ./index.rsh:133:17:application call to "announceWinner" (defined at: ./index.rsh:48:40:function exp)'],
      msg: 'declareWinner',
      who: 'Bob'
      });
    
    return;
    }
  
  
  
  };
const _ALGO = {
  ABI: {
    impure: [],
    pure: [],
    sigs: []
    },
  appApproval: `BiANAAECBwVQIAQoCGBZMCYCAQAAIjUAMRhBA54pZEkiWzUBIQlbNQI2GgAXSUEAByI1BCM1BgA2GgIXNQQ2GgM2GgEXSSEHDEABukmBBgxAANZJJQxAAFIlEkQlNAESRDQESSISTDQCEhFEKGRJNQNXMCA1/4AE4huzqbAyBjQDIQpbD0Q0A1cAIDEAEjT/MQASEUSxIrIBNAMhBVuyCCOyEDT/sgezQgLASCU0ARJENARJIhJMNAISEUQoZEk1A0lXACA1/4FYWzX+STUFFzX9gARw7e96NP0WULAyBjQDIQpbDEQ0/zEAEkQ0/TT+DUEABiM1/EIAEjT9NP4MQQAGIjX8QgAEIQc1/DT/NAMhBls0AyEIWzQDVzAgNPwyBjQDIQVbQgHRSSEEDEAAUUghBDQBEkQ0BEkiEkw0AhIRRChkSTUDVwAgNf+ABMyZklywMgY0AyELWw9ENP8xABI0A1cwIDEAEhFEsSKyATQDIQVbsggjshA0/7IHs0IB6kghBDQBEkQ0BEkiEkw0AhIRRChkSTUDSUpJVwAgNf8hBls1/iEIWzX9VzAgNfwhBVs1+0k1BRc1+oAE+YuveDT6FlCwMgY0AyELWwxENPwxABJEMgY0/Qg1+TT/NP4WUDT9FlA0/FA0+xZQNPoWUDT5FlAoSwFXAGhnSCU1ATIGNQJCAYFJIwxAAI5JJAxAAEAkEkQjNAESRDQESSISTDQCEhFEKGQ1A4AEQbFATbAyBjQDIQxbD0SxIrIBNAMhBluyCCOyEDQDVwAgsgezQgEZSCM0ARJENARJIhJMNAISEUQoZEk1AyEGWzX/gASai5F0sDIGNAMhDFsMRDT/iAFWNANXACA0/zQDIQhbMQAkMgY0/0kIQgBgSIGgjQaIATYiNAESRDQESSISTDQCEhFESTUFSSJbNf8hCVs1/oAErNEfwzT/FlA0/hZQsDT/iAEFMgY0/gg1/TEANP8WUDT+FlA0/RZQKEsBVwA4Z0gjNQEyBjUCQgCNNf81/jX9Nfw1+zX6Nfk0/SEHEjX4NP0kEjT4EUEANjT+NPsINfc0+TT6FlA0+xZQNPxQNP8WUDT4FlEHCFA09xZQKEsBVwBhZ0ghBDUBMgY1AkIAOLEisgEkNPoLsggjshA0/DT5NP0iEk2yB7NCAAAxGSEEEkSxIrIBIrIII7IQMgmyCTIKsgezQgAFMRkiEkQpNAEWNAIWUGc0BkEACoAEFR98dTQHULA0AEkjCDIEEkQxFhJEI0MxGSISREL/3yIxNBJEJDE1EkQiMTYSRCIxNxJEIjUBIjUCQv+vNABJSiMINQA4BzIKEkQ4ECMSRDgIEkSJ`,
  appClear: `Bg==`,
  companionInfo: null,
  extraPages: 0,
  mapDataKeys: 0,
  mapDataSize: 0,
  stateKeys: 1,
  stateSize: 104,
  unsupported: [],
  version: 10,
  warnings: []
  };
const _ETH = {
  ABI: `[
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v237",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v238",
                "type": "uint256"
              }
            ],
            "internalType": "struct T1",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T2",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "msg",
        "type": "uint256"
      }
    ],
    "name": "ReachError",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v237",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v238",
                "type": "uint256"
              }
            ],
            "internalType": "struct T1",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T2",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e0",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e1",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e2",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v296",
                "type": "uint256"
              }
            ],
            "internalType": "struct T10",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T11",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e4",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e5",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v312",
                "type": "uint256"
              }
            ],
            "internalType": "struct T12",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T13",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e6",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e7",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "_reachCreationTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentState",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m1",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m2",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v296",
                "type": "uint256"
              }
            ],
            "internalType": "struct T10",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T11",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m4",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m5",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v312",
                "type": "uint256"
              }
            ],
            "internalType": "struct T12",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T13",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m6",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m7",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]`,
  Bytecode: `0x60806040526040516200166c3803806200166c83398101604081905262000026916200024b565b6000808055436003556040805160208082018352928152815133815284518185015284840151805182850152909301516060840152905190917fa736757a943474ef5983bb0422ab3a1e64bcd39e99635f4430c7765118231f95919081900360800190a16020820151516200009f903414600762000144565b6020808301510151620000b39043620002ab565b81526040805160808082018352600060208084018281528486018381526060808701858152338089528b860180515186525186015184528a5182526001968790554390965588518086019690965292518589015290519084015251828401528451808303909301835260a0909101909352805191926200013a92600292909101906200016e565b505050506200030f565b816200016a5760405163100960cb60e01b81526004810182905260240160405180910390fd5b5050565b8280546200017c90620002d2565b90600052602060002090601f016020900481019282620001a05760008555620001eb565b82601f10620001bb57805160ff1916838001178555620001eb565b82800160010185558215620001eb579182015b82811115620001eb578251825591602001919060010190620001ce565b50620001f9929150620001fd565b5090565b5b80821115620001f95760008155600101620001fe565b604080519081016001600160401b03811182821017156200024557634e487b7160e01b600052604160045260246000fd5b60405290565b600081830360608112156200025f57600080fd5b6200026962000214565b835181526040601f19830112156200028057600080fd5b6200028a62000214565b60208581015182526040909501518582015293810193909352509092915050565b60008219821115620002cd57634e487b7160e01b600052601160045260246000fd5b500190565b600181811c90821680620002e757607f821691505b602082108114156200030957634e487b7160e01b600052602260045260246000fd5b50919050565b61134d806200031f6000396000f3fe6080604052600436106100845760003560e01c80638e314769116100565780638e314769146100ec578063980b6eac146100ff578063a209ad4e14610112578063ab53f2c614610125578063bf2c5b241461014857005b80631e93b0f11461008d5780632c10a159146100b15780637eea518c146100c457806383230757146100d757005b3661008b57005b005b34801561009957600080fd5b506003545b6040519081526020015b60405180910390f35b61008b6100bf366004610ff0565b61015b565b61008b6100d2366004610ff0565b6102f2565b3480156100e357600080fd5b5060015461009e565b61008b6100fa366004610ff0565b610470565b61008b61010d366004610ff0565b610607565b61008b610120366004610ff0565b6107fe565b34801561013157600080fd5b5061013a610a6b565b6040516100a8929190611013565b61008b610156366004610ff0565b610b08565b61016b6001600054146009610ca3565b6101858135158061017e57506001548235145b600a610ca3565b60008080556002805461019790611070565b80601f01602080910402602001604051908101604052809291908181526020018280546101c390611070565b80156102105780601f106101e557610100808354040283529160200191610210565b820191906000526020600020905b8154815290600101906020018083116101f357829003601f168201915b505050505080602001905181019061022891906110f8565b905061023b81606001514310600b610ca3565b7f400d21ea4e4a5e28b4ae5f0f476c201fc8036473fcf7c8cd252f38698020b4f1338360405161026c92919061117f565b60405180910390a1610285816020015134146008610ca3565b61028d610ea9565b815181516001600160a01b0390911690526020808301805183518301526040808501518451909101528251336060909101528183018051600290525143920191909152516102db90806111cd565b6020820151604001526102ed81610cc8565b505050565b610302600160005414600d610ca3565b61031c8135158061031557506001548235145b600e610ca3565b60008080556002805461032e90611070565b80601f016020809104026020016040519081016040528092919081815260200182805461035a90611070565b80156103a75780601f1061037c576101008083540402835291602001916103a7565b820191906000526020600020905b81548152906001019060200180831161038a57829003601f168201915b50505050508060200190518101906103bf91906110f8565b90506103d38160600151431015600f610ca3565b7f919263be6d51bec670ce110fb6a7df03fe323e3de4dade5355bccc6a4b06d950338360405161040492919061117f565b60405180910390a16104183415600c610ca3565b805160208201516040516001600160a01b039092169181156108fc0291906000818181858888f19350505050158015610455573d6000803e3d6000fd5b506000808055600181905561046c90600290610f02565b5050565b6104806005600054146017610ca3565b61049a8135158061049357506001548235145b6018610ca3565b6000808055600280546104ac90611070565b80601f01602080910402602001604051908101604052809291908181526020018280546104d890611070565b80156105255780601f106104fa57610100808354040283529160200191610525565b820191906000526020600020905b81548152906001019060200180831161050857829003601f168201915b505050505080602001905181019061053d91906111e5565b90506105518160c001514310156019610ca3565b7fbe731e9f2a129299a212b8ec3ac324fa99671cd00a5a827cbd3d4fe6d7ad541d338360405161058292919061117f565b60405180910390a161059634156015610ca3565b80516105ca906001600160a01b031633146105c05760608201516001600160a01b031633146105c3565b60015b6016610ca3565b805160808201516040516001600160a01b039092169181156108fc0291906000818181858888f19350505050158015610455573d6000803e3d6000fd5b610617600760005414601c610ca3565b6106318135158061062a57506001548235145b601d610ca3565b60008080556002805461064390611070565b80601f016020809104026020016040519081016040528092919081815260200182805461066f90611070565b80156106bc5780601f10610691576101008083540402835291602001916106bc565b820191906000526020600020905b81548152906001019060200180831161069f57829003601f168201915b50505050508060200190518101906106d4919061125f565b90506106ec6040518060200160405280600081525090565b6106fd8260c001514310601e610ca3565b7fa2ddd0bc62239facbd79cdab1df75ee0cb72af9166d4371e62852a98cb4ca19c338460405161072e9291906112d1565b60405180910390a16107423415601a610ca3565b815161075a906001600160a01b03163314601b610ca3565b60a0820151602084013511156107735760018152610791565b60a08201516020840135101561078c5760008152610791565b600481525b610799610ea9565b825181516001600160a01b0391821690526020808501518351820152604080860151845182015260608087015185519416930192909252835181840180519190915280514392019190915260808501519051909101526107f881610cc8565b50505050565b61080e6005600054146012610ca3565b6108288135158061082157506001548235145b6013610ca3565b60008080556002805461083a90611070565b80601f016020809104026020016040519081016040528092919081815260200182805461086690611070565b80156108b35780601f10610888576101008083540402835291602001916108b3565b820191906000526020600020905b81548152906001019060200180831161089657829003601f168201915b50505050508060200190518101906108cb91906111e5565b90506108e36040518060200160405280600081525090565b6108f48260c0015143106014610ca3565b7f117ff0fc7909f539043dcba1a015e3c49852b86bcb1c87a6cfa653f771ccbdc033846040516109259291906112d1565b60405180910390a161093934156010610ca3565b6060820151610954906001600160a01b031633146011610ca3565b604082015161096390436111cd565b81526040805160e081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c081019190915282516001600160a01b039081168083526020808601518185019081526040808801518187019081526060808a015187168189019081526080808c0151818b019081528d88013560a0808d019182528d5160c0808f0191825260076000554360015589519b8c019c909c529851978a0197909752945193880193909352905190971696850196909652945190830152925191810191909152905160e08201526101000160405160208183030381529060405260029080519060200190610a64929190610f3f565b5050505050565b600060606000546002808054610a8090611070565b80601f0160208091040260200160405190810160405280929190818152602001828054610aac90611070565b8015610af95780601f10610ace57610100808354040283529160200191610af9565b820191906000526020600020905b815481529060010190602001808311610adc57829003601f168201915b50505050509050915091509091565b610b186007600054146021610ca3565b610b3281351580610b2b57506001548235145b6022610ca3565b600080805560028054610b4490611070565b80601f0160208091040260200160405190810160405280929190818152602001828054610b7090611070565b8015610bbd5780601f10610b9257610100808354040283529160200191610bbd565b820191906000526020600020905b815481529060010190602001808311610ba057829003601f168201915b5050505050806020019051810190610bd5919061125f565b9050610be98160c001514310156023610ca3565b7f3a35e33c7cbe4475e726117e3691b4a75ad6c9b28c29c59a1ef792dd449861bb3383604051610c1a92919061117f565b60405180910390a1610c2e3415601f610ca3565b8051610c62906001600160a01b03163314610c585760608201516001600160a01b03163314610c5b565b60015b6020610ca3565b80606001516001600160a01b03166108fc82608001519081150290604051600060405180830381858888f19350505050158015610455573d6000803e3d6000fd5b8161046c5760405163100960cb60e01b81526004810182905260240160405180910390fd5b60408051808201909152600080825260208201526020820180515160041482525151600214610cf8578051610cfb565b60015b15610e46578151604001516020808401510151610d1891906111cd565b816020018181525050610d756040518060e0016040528060006001600160a01b03168152602001600081526020016000815260200160006001600160a01b0316815260200160008152602001600015158152602001600081525090565b8251516001600160a01b039081168083528451602090810151818501908152865160409081015181870190815288516060908101518716818901908152858b01518401516080808b019182528b51151560a0808d019182528d8a015160c0808f0191825260056000554360015589519b8c019c909c529851978a01979097529451938801939093529051909716908501529451908301529251151591810191909152905160e082015261010001604051602081830303815290604052600290805190602001906107f8929190610f3f565b60208201515115610e5c57815160600151610e60565b8151515b6001600160a01b03166108fc8360000151602001516002610e8191906112f8565b6040518115909202916000818181858888f19350505050158015610455573d6000803e3d6000fd5b6040805160c0810182526000918101828152606082018390526080820183905260a08201929092529081908152602001610efd60405180606001604052806000815260200160008152602001600081525090565b905290565b508054610f0e90611070565b6000825580601f10610f1e575050565b601f016020900490600052602060002090810190610f3c9190610fc3565b50565b828054610f4b90611070565b90600052602060002090601f016020900481019282610f6d5760008555610fb3565b82601f10610f8657805160ff1916838001178555610fb3565b82800160010185558215610fb3579182015b82811115610fb3578251825591602001919060010190610f98565b50610fbf929150610fc3565b5090565b5b80821115610fbf5760008155600101610fc4565b600060408284031215610fea57600080fd5b50919050565b60006040828403121561100257600080fd5b61100c8383610fd8565b9392505050565b82815260006020604081840152835180604085015260005b818110156110475785810183015185820160600152820161102b565b81811115611059576000606083870101525b50601f01601f191692909201606001949350505050565b600181811c9082168061108457607f821691505b60208210811415610fea57634e487b7160e01b600052602260045260246000fd5b60405160e0810167ffffffffffffffff811182821017156110d657634e487b7160e01b600052604160045260246000fd5b60405290565b80516001600160a01b03811681146110f357600080fd5b919050565b60006080828403121561110a57600080fd5b6040516080810181811067ffffffffffffffff8211171561113b57634e487b7160e01b600052604160045260246000fd5b604052611147836110dc565b81526020830151602082015260408301516040820152606083015160608201528091505092915050565b8015158114610f3c57600080fd5b6001600160a01b0383168152813560208083019190915260608201908301356111a781611171565b8015156040840152509392505050565b634e487b7160e01b600052601160045260246000fd5b600082198211156111e0576111e06111b7565b500190565b600060e082840312156111f757600080fd5b6111ff6110a5565b611208836110dc565b8152602083015160208201526040830151604082015261122a606084016110dc565b60608201526080830151608082015260a083015161124781611171565b60a082015260c0928301519281019290925250919050565b600060e0828403121561127157600080fd5b6112796110a5565b611282836110dc565b815260208301516020820152604083015160408201526112a4606084016110dc565b60608201526080830151608082015260a083015160a082015260c083015160c08201528091505092915050565b6001600160a01b03831681526060810161100c602083018480358252602090810135910152565b6000816000190483118215151615611312576113126111b7565b50029056fea264697066735822122054ae248cb068ddd24edb5e923e44730613d6cc1da37819777c08986b1c11bc1e64736f6c634300080c0033`,
  BytecodeLen: 5740,
  Which: `oD`,
  version: 7,
  views: {
    }
  };
export const _stateSourceMap = {
  1: {
    at: './index.rsh:87:11:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  2: {
    at: 'reach standard library:202:11:after expr stmt semicolon',
    fs: ['at ./index.rsh:93:51:application call to "closeTo" (defined at: reach standard library:198:8:function exp)'],
    msg: null,
    who: 'Module'
    },
  4: {
    at: './index.rsh:135:11:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  5: {
    at: './index.rsh:102:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  6: {
    at: 'reach standard library:202:11:after expr stmt semicolon',
    fs: ['at ./index.rsh:113:53:application call to "closeTo" (defined at: reach standard library:198:8:function exp)'],
    msg: null,
    who: 'Module'
    },
  7: {
    at: './index.rsh:114:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  8: {
    at: 'reach standard library:202:11:after expr stmt semicolon',
    fs: ['at ./index.rsh:120:53:application call to "closeTo" (defined at: reach standard library:198:8:function exp)'],
    msg: null,
    who: 'Module'
    }
  };
export const _Connectors = {
  ALGO: _ALGO,
  ETH: _ETH
  };
export const _Participants = {
  "Alice": Alice,
  "Bob": Bob
  };
export const _APIs = {
  };
