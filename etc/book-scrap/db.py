from mysql.connector.pooling import MySQLConnectionPool
from mysql.connector import Error
from contextlib import contextmanager
from dotenv import load_dotenv
import os

load_dotenv()


DATABASE_HOST = os.getenv("DATABASE_HOST")
DATABASE_PORT = os.getenv("DATABASE_PORT")
DATABASE_NAME = os.getenv("DATABASE_NAME")
DATABASE_USER = os.getenv("DATABASE_USERNAME")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")


pool = MySQLConnectionPool(
    pool_name="db_pool",
    pool_size=5,
    host=DATABASE_HOST,
    port=DATABASE_PORT,
    database=DATABASE_NAME,
    user=DATABASE_USER,
    password=DATABASE_PASSWORD,
)


@contextmanager
def get_connection():

    conn = pool.get_connection()
    try:
        yield conn
    finally:
        conn.close()


def execute_query(query, params=None):
    try:
        with get_connection() as conn:
            with conn.cursor(buffered=True, dictionary=True) as cursor:
                if params:
                    cursor.execute(query, params)
                else:
                    cursor.execute(query)

                conn.commit()

                return cursor.lastrowid

    except Error as e:
        print("쿼리 실행 오류:", e)
        return None
