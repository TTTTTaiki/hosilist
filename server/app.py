from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg

connection = psycopg.connect(
    host='localhost',
    dbname='hosilist',
    user='postgres',
    password='password',
)
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
cors = CORS(app)


@app.route('/hosis', methods=['GET'])
def get_hosis():
    sql = '''
    SELECT リストグループ.リスト名, 商品名, 値段, 購入ページURL
    FROM リストグループ, ほしリスト
    WHERE リストグループ.リストID = ほしリスト.リストID;;
    '''
    cursor = connection.cursor()
    cursor.execute(sql)
    results = cursor.fetchall()

    hosi_list = []
    for result in results:
        hosi_data = {
            "リスト名": result[0],
            "商品名": result[1],
            "値段": result[2],
            "購入ページURL": result[3]
        }
        hosi_list.append(hosi_data)
    return jsonify(hosi_list)


@app.route('/hosis', methods=['POST'])
def post_hosi():
    content = request.get_json()
    
    try:
        sql = '''
        INSERT INTO ほしリスト (リストID, 商品名, 値段, 購入ページURL)
        VALUES (%(リスト名)s, %(商品名)s, %(値段)s, %(購入ページURL)s);
        '''
        print(content, sql)
        connection.execute(sql, content)
    except Exception as e:
        print("Error:", e)
        connection.rollback()
        return {"message":"失敗"}
    else:
        connection.commit()
        return {"message":"成功"}


@app.route('/lists', methods=['GET'])
def get_lists():
    sql = '''
    SELECT * from "リストグループ";
    '''
    cursor = connection.cursor()
    cursor.execute(sql)
    results = cursor.fetchall()

    list_list = []
    for result in results:
        list_data = {
            "リストID": result[0],
            "リスト名": result[1]
        }
        list_list.append(list_data)

    return jsonify(list_list)


@app.route('/lists', methods=['POST'])
def post_list():
    content = request.get_json()
    
    try:
        sql = '''
        INSERT INTO リストグループ (リスト名) VALUES (%(リスト名)s);
        '''
        print(content, sql)
        connection.execute(sql, content)
    except Exception as e:
        print("Error:", e)
        connection.rollback()
        return {"message":"失敗"}
    else:
        connection.commit()
        return {"message":"成功"}


