# coding: utf-8
__author__ = 'ila'

import os

import pymysql
from mrjob.job import MRJob
from util.hdfs_func import upload_file_to_hdfs

class MySQLMapReduce(MRJob):

    def mapper(self, _, line):
        ret = line.split(",")
        yield (ret[0], float(ret[1]))

    def reducer(self, key, values):
        yield key, sum(values)


def query(host: str, port: int, user: str, passwd: str, database: str, table: str, col: str,  statement: str):
    data_list = []
    try:
        con = pymysql.connect(
            host=host,
            port=port,
            user=user,
            passwd=passwd,
            database=database,
            charset='utf8',
        )
    except pymysql.Error as e:
        print(f"read_data_from_mysql error : {e}")
        return

    cur = con.cursor()

    cur.execute(statement)
    raw_data = cur.fetchall()
    for data in raw_data:
        try:
            val=float(data[0])
        except:
            val=1
        data_list.append(val)
    cur.close()
    con.close()

    filename = f"{table}_{col}_mr.txt"
    if os.path.exists(filename) == True:
        os.remove(filename)
    with open(filename, "a", encoding="utf-8") as f:
        for data in data_list:
            f.write(f"{col},{data}\n")

def run_mapreduce_work(host: str, port: int, user: str, passwd: str, database: str, table: str, col: str, statement: str):
    query(host,
          port,
          user,
          passwd,
          database,
          table,
          col,
          statement,
          )
    mr = MySQLMapReduce(args=["-r", "inline", "-o", table, f"{table}_{col}_mr.txt", ])
    runner = mr.make_runner()
    runner.run()
    port = 50070
    tmp_dir = "tmp"
    hdfs_url = f"http://localhost:{port}/"
    for _,_,files in os.walk(f"./{table}"):
        for filename in files:
            filepath = f"./{table}/{filename}"
            upload_file_to_hdfs(hdfs_url,tmp_dir,filepath)

if __name__ == "__main__":
    host = "127.0.0.1"
    port = 3306
    user = "root"
    passwd = "123456"
    database = "django0fwj8"
    table = "naikexiezi"
    col = 'jiage'

    run_mapreduce_work(
        host,
        port,
        user,
        passwd,
        database,
        table,
        col,
        f'''select {col} from {table} where {col} is not null ''',
    )
