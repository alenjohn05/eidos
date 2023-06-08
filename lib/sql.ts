import type { SqlDatabase } from '@/worker/sql';
import { useEffect, useState } from 'react';

const worker = new Worker(new URL('../worker/sql.ts', import.meta.url), { type: 'module' })

let id = 0;

const SQLWorker = new Proxy<SqlDatabase>({} as any, {
  get(target, method) {
    const thisCallId = ++id;
    return function (params: any) {
      const [_params, ...rest] = arguments
      worker.postMessage({ method, params: [_params, rest], id: thisCallId })
      return new Promise((resolve, reject) => {
        worker.onmessage = (e) => {
          const { id: returnId, result } = e.data
          if (returnId === thisCallId) {
            resolve(result)
          }
        }
      })
    }
  }
})

export const useSqlite = () => {
  const [isInit, setIsInit] = useState(false)
  const [sqlite, setSqlite] = useState<SqlDatabase | null>(null)
  useEffect(() => {
    worker.onmessage = (e) => {
      if (e.data === 'init') {
        setIsInit(true)
        setSqlite(SQLWorker)
      }
    }
  }, [])

  if (!isInit) {
    return null
  }
  return sqlite
}


export const demo = async (sqlite: ReturnType<typeof useSqlite>) => {
  if (!sqlite) return;
  await sqlite.sql`
  
`
  await sqlite.sql`CREATE TABLE IF NOT EXISTS mytable1 (
    name             VARCHAR(5) NOT NULL
   ,id               VARCHAR(19) NOT NULL
   ,comment_count    BIT  NOT NULL
   ,install_count    INTEGER  NOT NULL
   ,like_count       INTEGER  NOT NULL
   ,unique_run_count INTEGER  NOT NULL
   ,view_count       INTEGER  NOT NULL
   ,创建时间             VARCHAR(19) NOT NULL
 );`

 await sqlite.sql`
 INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,0,8,35,122,'2023/03/29 06:05 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,0,8,39,142,'2023/03/29 08:30 晚上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,0,8,45,163,'2023/03/30 02:55 下午');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,0,9,49,174,'2023/03/30 08:29 晚上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,0,10,58,213,'2023/03/31 08:30 晚上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,1,10,63,236,'2023/04/01 08:30 晚上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,1,10,68,257,'2023/04/02 08:30 晚上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,1,11,69,273,'2023/04/03 08:29 晚上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,1,11,69,274,'2023/04/03 08:51 晚上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,1,11,82,317,'2023/04/05 05:32 凌晨');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,2,12,90,346,'2023/04/06 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,2,12,98,358,'2023/04/07 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,2,13,102,375,'2023/04/08 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,2,14,104,384,'2023/04/09 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,2,14,105,389,'2023/04/10 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,2,15,114,399,'2023/04/11 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,2,15,118,410,'2023/04/12 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,2,15,118,415,'2023/04/13 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,2,16,123,422,'2023/04/14 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,2,16,125,425,'2023/04/15 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,2,16,127,427,'2023/04/16 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,2,16,127,430,'2023/04/17 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,2,16,129,430,'2023/04/18 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,2,16,132,431,'2023/04/19 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,2,16,134,436,'2023/04/20 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,3,16,136,441,'2023/04/21 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,3,16,136,443,'2023/04/22 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,3,16,139,443,'2023/04/23 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,3,16,139,443,'2023/04/24 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,4,16,142,444,'2023/04/25 08:32 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,4,16,146,448,'2023/04/26 08:57 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,4,16,148,450,'2023/04/27 08:57 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,4,16,150,450,'2023/04/28 08:57 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,4,16,151,451,'2023/04/29 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,4,17,151,452,'2023/04/30 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,4,17,152,453,'2023/05/01 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,4,17,152,458,'2023/05/02 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,4,17,155,462,'2023/05/03 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,4,17,155,462,'2023/05/04 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,4,17,157,465,'2023/05/05 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,4,17,160,466,'2023/05/06 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,4,17,160,467,'2023/05/07 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,5,17,164,467,'2023/05/08 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,5,17,168,467,'2023/05/09 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,5,17,172,470,'2023/05/10 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,5,17,172,472,'2023/05/11 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,5,17,172,474,'2023/05/12 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,5,17,174,478,'2023/05/13 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,5,17,175,479,'2023/05/14 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,5,17,175,480,'2023/05/15 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,5,17,180,480,'2023/05/16 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,5,17,182,480,'2023/05/17 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,5,17,186,482,'2023/05/18 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,5,17,188,485,'2023/05/19 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,5,17,189,485,'2023/05/20 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,5,17,189,485,'2023/05/21 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,5,17,189,487,'2023/05/22 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,5,17,189,488,'2023/05/23 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,5,17,191,489,'2023/05/24 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,5,17,194,491,'2023/05/25 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,5,17,197,492,'2023/05/26 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,6,17,200,494,'2023/05/27 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,6,17,202,494,'2023/05/28 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,6,17,202,494,'2023/05/29 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,6,17,204,494,'2023/05/30 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,6,17,209,495,'2023/05/31 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,6,17,214,499,'2023/06/01 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,6,17,220,499,'2023/06/02 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,6,17,223,506,'2023/06/03 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,6,17,225,506,'2023/06/04 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,6,17,225,507,'2023/06/05 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,7,17,231,509,'2023/06/06 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,7,17,233,512,'2023/06/07 08:45 早上');
INSERT INTO mytable1(name,id,comment_count,install_count,like_count,unique_run_count,view_count,创建时间) VALUES ('Plato','1220625048523881652',1,7,17,236,516,'2023/06/08 08:45 早上');
 
 `

  const limit = 3;
  const r3 = await sqlite.sql`Select * from mytable1 limit ${limit}`
  console.log(
    r3
  )
}