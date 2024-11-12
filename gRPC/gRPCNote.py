'''
C: client app call methods on a S: server app as if local obj
gRPC C & S can be written in diff. supported langs

gPRC uses protocal buffers: mechanism for serialising stru data
def stru data as messages, each msg is a field, i.e. name-value
'''

'''
Methods:
    Unary: 1 req, 1 resp
    S-streaming: 1 req, multi resp
    C-streaming: multi req, one resp
    Bidir-streaming: multi req, multi resp
'''

# Deadlines
# Channels: state: connected / idle

# server.py
class Greeter(PBfilename_pb2_grpc.GreeterServicer):
    # define message: <rpc>()
    def sayHello(self, request, context):
        return PBfilename_pb2.Resp(message=f"Hello, {request.name}!")
    def Sstream(self, request, context):
        # use for loop for streaming
        for i in self.db:
            yield PBfilename_pb2.Resp(message=f"Server (response) stream: {i}!")
    def Cstream(self, request_iterator, context):
        for i in request_iterator:
            yield PBfilename_pb2.Resp(message=f"Client (request) stream: {i}!")
    def biStream(self, request_iterator, context):
        for i in request_iterator:
            yield PBfilename_pb2.Resp(message=f"Bidir stream: {i}!")
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    PBfilename_pb2_grpc.add_GreeterServicer_to_server(Greeter(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

# client.py
def run():
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = PBfilename_pb2_grpc.GreeterStub(channel)
        # resp = stub.<rpc>(<out>.<message>)

        resp = stub.sayHello(PBfilename_pb2.Req(name='John'), timeout=3)
        asyncResp = stub.getSth.future()
        result = asyncResp.result()
        
        print("Greeter client rcv: " + resp.message)
        # ...