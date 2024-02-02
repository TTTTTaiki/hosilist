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
    SELECT * from "ほしリスト";
    '''
    cursor = connection.cursor()
    cursor.execute(sql)
    results = cursor.fetchall()

    hosi_list = []
    for result in results:
        hosi_data = {
            "商品名": result[0],
            "値段": result[1],
            "購入ページURL": result[2]
        }
        hosi_list.append(hosi_data)

    return jsonify(hosi_list)


@app.route('/hosis', methods=['POST'])
def post_hosi():
    content = request.get_json()
    print(content)
    
    try:
        sql = '''
        INSERT INTO "" ("リスト名") VALUES (%s);
        '''

        values = (content['リスト名'])
        cursor = connection.cursor()
        cursor.execute(sql, values)
    except Exception as e:
        print("Error:", e)
        connection.rollback()
    else:
        connection.commit()
    
    return 1


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


