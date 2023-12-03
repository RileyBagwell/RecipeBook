from flask import Flask, jsonify, request
from flask_cors import CORS
from DBMgr import Cloud_Server

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
cloud_server = Cloud_Server()
db_manager = Cloud_Server()


@app.route("/api/user/<user_id>", methods=["GET"])
def get_user_info(userID):
    user_info = cloud_server.get_user_info(userID)
    return jsonify(user_info)


@app.route("/api/create_post", methods=["POST"])
def create_post():
    data = request.json
    post_title = data.get("postTitle")
    post_text = data.get("postText")
    user_id = data.get("userID")

    db_manager.create_post(user_id, post_title, "", post_text)

    return jsonify({"message": "Post created successfully"})


@app.route("/api/ten_posts/<int:buffer>", methods=["GET"])
def get_ten_posts(buffer):
    post_list = []

    for post_ID in range(buffer, buffer + 10):
        post_info = db_manager.get_post_infoID(post_ID)
        if post_info:
            post_dict = {
                "postID": post_info[0],
                "postTitle": post_info[1],
                "user_ID": post_info[2],
                "postImage": post_info[3],
                "postText": post_info[4],
                "userID": post_info[5],
                "reviewList": post_info[6],
            }
            post_list.append(post_dict)
        else:
            # Break the loop if no more posts are found
            break

    return jsonify({"posts": post_list})


if __name__ == "__main__":
    app.run(debug=True)
