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
def post_lists():
    content = request.get_json()
    print(content)
    
    try:
        sql = '''
        INSERT INTO "リストグループ" ("リスト名") VALUES (%s)
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


@app.route("/list1", methods=["post"])
def postList1():
    content = request.get_json()
    
    try:
        sql = '''
        INSERT INTO "リスト1" ("商品名", "値段", "購入ページURL") 
        VALUES (%s, %s, %s);
        '''
        values = (content['商品名'], content['値段'], content['購入ページURL'])
        cursor = connection.cursor()
        cursor.execute(sql, values)
    except Exception as e:
        print("Error:", e)
        connection.rollback()
    else:
        connection.commit()
    
    return 1



@app.route("/list1", methods=['GET'])
def getList1():
    sql = '''
    SELECT * FROM "ほしリスト";
    '''
    cursor = connection.cursor()
    cursor.execute(sql)
    results = cursor.fetchall()

    person_list = []
    for result in results:
        person_data = {
            "商品名": result[0], 
            "値段": result[1],
            "購入ページURL": result[2]
        }
        person_list.append(person_data)

    return jsonify(person_list)

# @app.route("/personcount")
# def getPersonCount():
#     sql = '''
#     SELECT COUNT(*) FROM "人物データ";
#     '''
#     cursor = connection.cursor()
#     cursor.execute(sql)
#     results = cursor.fetchone()
    
#     return jsonify({"登録人数": results[0]})
