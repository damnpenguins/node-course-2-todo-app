var env = process.env.NODE_ENV;

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB = 'mongodb://localhost:27017/TodoAppTest';
}

console.log(env);
