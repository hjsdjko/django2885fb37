# coding:utf-8
__author__ = "ila"

from django.db import connection
from django.utils.deprecation import MiddlewareMixin

from util.hive_func import hive_func
from dj2.settings import dbName

class HiveMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        sql_list = []
        for query in connection.queries:
            if query.get("sql") is None:
                continue

            raw_sql = query.get("sql")
            raw_sql=raw_sql.lower()
            # INSERT INTO `user` (`username`, `password`, `role`, `addtime`) VALUES ('user2', '123', '', '2023-09-25 00:42:01.490211')

            # 只判断insert的数据
            if 'insert' in raw_sql and len(raw_sql) > 8:
                print(raw_sql)
                sql_list.append(raw_sql)

        hive_func(sql_list)
        return response
