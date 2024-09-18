# coding: utf-8
__author__ = 'ila'
import configparser
from hdfs.client import Client
def upload_to_hdfs(filename):
    try:
        port = 50070
        cp = configparser.ConfigParser()
        cp.read('config.ini')

        client = Client(f"http://{cp.get('sql','host')}:{port}/")
        user_dir = "tmp"
        client.upload(hdfs_path=f'/{user_dir}/{filename}', local_path=filename, chunk_size=2 << 19, overwrite=True)
    except Exception as e:
        print(f'upload_to_hdfs eror : {e}')

def upload_file_to_hdfs(hdfs_url,dir,filename):
    try:

        client = Client(hdfs_url)

        client.upload(hdfs_path=f'/{dir}/{filename}', local_path=filename, chunk_size=2 << 19, overwrite=True)
    except Exception as e:
        print(f'upload_to_hdfs eror : {e}')

if __name__=='__main__':
    port = 50070
    tmp_dir = "tmp"
    hdfs_url=f"http://localhost:{port}/"
    filepath="./naikexiezi/part-00000"
    upload_file_to_hdfs(hdfs_url,tmp_dir,filepath)
