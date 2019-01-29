# learn-express
  
Get Student  
url : `/student`  
method: `GET`  
query param : `name`, `page` and `displayItems`   
response: 
```
{
  data: [
    { id: 1, name: 'Budi 1', yearOfBirth: 1, grade: 10  },
    { id: 2, name: 'Budi 2', yearOfBirth: 2, grade: 20  },
  ],
  page: 1,
  totalPages: 1,
  displayItems: 10
}
```
  
Add New Student  
url: `/student/new`  
method: `POST`  
request: 
```
{
    name: 'Test',
    yearOfBirth: 10,
    grade: 50
}
```
response: 
```
{
  status: 'Success'
}
```
validation error response: 
```
{
  error: "Error"
}
```
  
Edit New Student  
url: `/student/:id`  
method: `POST`  
request: 
```
{
    name: 'Test',
    yearOfBirth: 10,
    grade: 50
}
```
response: 
```
{
  status: 'Success'
}
```
validation error response: 
```
{
  error: "Error"
}
```
