# coding: utf-8
__author__ = 'ila'

from impala.dbapi import connect

from dj2.settings import dbName
from util.convert_mysql_to_hive import ConvertMySQLToHive


def hive_func(sql_list: list):
    cv = ConvertMySQLToHive(dbName)
    for sql_str in sql_list:
        hive_list = cv.convert_mysql_to_hive(sql_str)
        if len(hive_list) > 0:
            hive_execute(hive_list)


def hive_execute(hive_list: list):
    try:
        conn = connect(host='127.0.0.1', port=10086, user="", password="")
    except Exception as e:
        print(f"{hive_execute} error : {e}")
        return
    
    cur = conn.cursor()

    for hive_sql in hive_list:
        try:
            cur.execute(hive_sql)
        except Exception as e:
            print("Exception======>", e)
            print("hive_sql=====>", hive_sql)

    conn.close()
