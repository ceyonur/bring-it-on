define({ "api": [
  {
    "type": "post",
    "url": "/records/bring",
    "title": "Bring Records",
    "name": "BringRecords",
    "group": "Records",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>Records created after.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>Records created before.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "minCount",
            "description": "<p>Records with minimum sum counts.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "maxCount",
            "description": "<p>Records with maximum sum counts.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"startDate\": \"2016-01-26\",\n  \"endDate\": \"2018-02-02\",\n  \"minCount\": 2700,\n  \"maxCount\": 3000\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Success code 0.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Success.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "records",
            "description": "<p>Records list.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "records.key",
            "description": "<p>Record key.</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "records.createdAt",
            "description": "<p>Record created datetime.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "records.totalCount",
            "description": "<p>Sum of record's counts.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"code\": 0,\n \"msg\": \"Success\",\n \"records\": [\n   {\n       \"key\": \"xqT9N0XwJ4qwU0GQ\",\n       \"createdAt\": \"2016-07-06T06:54:46.169Z\",\n       \"totalCount\": 2700\n   },\n   {\n       \"key\": \"NMBUu74JC1bEGECM\",\n       \"createdAt\": \"2016-07-06T13:12:01.175Z\",\n       \"totalCount\": 2800\n   },\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Custom Errors": [
          {
            "group": "Custom Errors",
            "type": "Object",
            "optional": false,
            "field": "DBError",
            "description": "<p>Database Error.</p>"
          }
        ],
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "ParameterError",
            "description": "<p>Unexpected parameter type or value.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "DBError-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"code\": 1,\n    \"msg\": \"An error occured on database connection.\"\n}",
          "type": "json"
        },
        {
          "title": "ParameterError-Response:",
          "content": "HTTP/1.1 400 Bad Request\n {\n   \"code\": 400,\n   \"msg\": {\n     \"maxCount\": \"Invalid value\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/records.js",
    "groupTitle": "Records"
  }
] });
