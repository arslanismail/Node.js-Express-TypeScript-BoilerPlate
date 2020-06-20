<!--
Recomended Database Style Guide
Authur: Arslan Ismail [AI] (arslanismail840@gmail.com)

-->

# Conduit Database Style Guide

Reasons for using a naming convention (as opposed to allowing programmers to choose any character sequence) include the following:

- To reduce the effort needed to read and understand source code.
- To enable code reviews to focus on more important issues than arguing over syntax and naming standards.
- To enable code quality review tools to focus their reporting mainly on significant issues other than syntax and style preferences.

## Table of Contents

- [AION Digital Database Rules](#aion-db-rules)
- [SQL Server Object Name Convention](#sql-server-object-name-convention)
- [SQL Server Data Types Recommendation](#data-types-recommendation)
- [T-SQL Programming T-SQL Style](#t-sql-programming-style)
  - [General T-SQL programming style](#general-t-sql-programming-style)
- [Reference and useful links](#reference)

## AION Digital Database Rules

<a id="aion-db-rules"></a>

### All tables should have following columns

| Column Name | Type             | Rules        | Possible Values               | Example                                |
| ----------- | ---------------- | ------------ | ----------------------------- | -------------------------------------- |
| id          | guid             | PK, Not Null | uuid (always in lowercase)    | `c16b15d0-a335-4ac4-8f2f-e73408364b3b` |
| created_by  | [varchar][5]     | Not Null     | user_id, "SYSTEM" (if seeded) | "SYSTEM"                               |
| created_on  | [datetimeoffset] | Not Null     | [datetime with timezone]      | "2025-12-10 12:32:10.1237 +01:00"      |
| updated_by  | [varchar][5]     | Not Null     | user_id, "SYSTEM" (if seeded) | "SYSTEM"                               |
| updated_on  | [datetimeoffset] | Not Null     | [datetime with timezone]      | "2025-12-10 12:32:10.1237 +01:00"      |

### Rules

- Use 7 digits precision (default) for Miliseconds.

```sql
/* default 7-precision */
DECLARE @MyDatetime2 datetime2
-- or
DECLARE @MyDatetime2 datetime2(7)
```

- `NULL` columns should be properly justified; avoid them to the max extent possible.
- `Store procedures` should not be used; they impact database portability.
- Use unique constraints when possible.
- Create `View` when queries are getting complex (when more than 3 tables are being joined).
- Use indexes only when necessary
- [Date Time Formatting][date_time_formatting]

  - Never use `/` in the Dates, because different langugage consider `/` in different format.

  ```sql
  SET LANGUAGE ENGLISH;
  GO
  SELECT CONVERT(DATETIME, '10/11/2020'); # OUTPUT: '2020-10-11 00:00:00.000'
  SET LANGUAGE SPANISH;
  GO
  SELECT CONVERT(DATETIME, '10/11/2020'); # OUTPUT: '2020-11-10 00:00:00.000'
  ```

  - Use DATETIME2 instead of DATETIME; DATETIME gives different values for `-` separated dates in different regions.

  ```sql
  SET LANGUAGE ENGLISH;
  GO
  /* bad */
  SELECT CONVERT(DATETIME, '2020-10-11'); # OUTPUT: '2020-10-11 00:00:00.000'
  /* good */
  SELECT CONVERT(DATETIME2, '2020-10-11'); # OUTPUT: '2020-10-11 00:00:00.0000000'
  SET LANGUAGE SPANISH;
  GO
  /* bad */
  SELECT CONVERT(DATETIME, '2020-10-11'); # OUTPUT: '2020-11-10 00:00:00.000'
  /* good */
  SELECT CONVERT(DATETIME2, '2020-10-11'); # OUTPUT: '2020-10-11 00:00:00.0000000'
  ```

  - Use date range to filter the records, Don't use Between because it adds the records of the next day with 00:00:00.000 time.

  ```sql
  /* bad */
  SELECT COUNT(*)
      FROM dbo.SomeLogTable
      WHERE DateColumn BETWEEN '20091011' AND '20091012';
  /* good */
  SELECT COUNT(*)
      FROM dbo.SomeLogTable
      WHERE DateColumn >= '20091011'
      AND DateColumn < '20091012';
  -- or
  SELECT COUNT(*)
      FROM dbo.SomeLogTable
      WHERE DateColumn BETWEEN '20091011' AND '2009-10-11T23:59:59.997';
  -- or
  SELECT COUNT(*)
      FROM dbo.SomeLogTable
      WHERE DateColumn BETWEEN '20091011' AND DATEADD(SECOND, -1, '20091012');
  ```

[datetimeoffset]: https://docs.microsoft.com/sql/t-sql/data-types/datetimeoffset-transact-sql
[datetime with timezone]: https://dba.stackexchange.com/questions/59006/what-is-a-valid-use-case-for-using-timestamp-without-time-zone
[date_time_formatting]: https://sqlblog.org/2009/10/16/bad-habits-to-kick-mis-handling-date-range-queries

**[⬆ back to top](#table-of-contents)**

## SQL Server Object Name Convention

<a id="sql-server-object-name-convention"></a>

| Object                           | Notation   | Length | Prefix | Suffix | Abbreviation | Characters | Example                                 |
| -------------------------------- | ---------- | -----: | ------ | ------ | ------------ | ---------- | --------------------------------------- |
| [Database]                       | UPPERCASE  |     30 | No     | No     | Yes          | [A-z]      | `MYDATABASE`                            |
| [Schema]                         | lowercase  |     30 | No     | No     | Yes          | [a-z][0-9] | `dbo`                                   |
| [Table Column]                   | snake_case |    128 | No     | No     | Yes          | [A-z][0-9] | `my_column`                             |
| [File Table]                     | snake_case |    128 | `FT_`  | No     | Yes          | [A-z][0-9] | `FT_my_table`                           |
| [Table Primary Key]              | snake_case |    128 | `PK_`  | No     | Yes          | [A-z][0-9] | `PK_my_table_id`                        |
| [Table Unique (Alternative) Key] | snake_case |    128 | `AK_`  | No     | Yes          | [A-z][0-9] | `AK_my_table_my_column_another_column`  |
| [Table Foreign Key]              | snake_case |    128 | `FK_`  | No     | Yes          | [A-z][0-9] | `FK_my_table_foreign_table_id`          |
| [Table Clustered Index]          | snake_case |    128 | `IXC`  | No     | Yes          | [A-z][0-9] | `IXC_my_table_my_column_another_column` |
| [Table Non Clustered Index]      | snake_case |    128 | `IX_`  | No     | Yes          | [A-z][0-9] | `IX_my_table_my_column_another_column`  |
| [Sequence]                       | snake_case |    128 | `sq_`  | No     | No           | [A-z][0-9] | `sq_table_name`                         |

[database]: https://docs.microsoft.com/en-us/sql/t-sql/statements/create-database-transact-sql
[schema]: https://docs.microsoft.com/en-us/sql/relational-databases/security/authentication-access/create-a-database-schema
[table column]: https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-table-transact-sql
[file table]: https://docs.microsoft.com/en-us/sql/relational-databases/blob/filetables-sql-server
[table primary key]: https://docs.microsoft.com/en-us/sql/relational-databases/tables/create-primary-keys
[table unique (alternative) key]: https://docs.microsoft.com/en-us/sql/relational-databases/tables/create-unique-constraints
[table foreign key]: https://docs.microsoft.com/en-us/sql/relational-databases/tables/create-foreign-key-relationships
[table clustered index]: https://docs.microsoft.com/en-us/sql/relational-databases/indexes/clustered-and-nonclustered-indexes-described
[table non clustered index]: https://docs.microsoft.com/en-us/sql/relational-databases/indexes/clustered-and-nonclustered-indexes-described
[sequence]: https://docs.microsoft.com/en-us/sql/relational-databases/sequence-numbers/sequence-numbers

**[⬆ back to top](#table-of-contents)**

## SQL Server Data Types Recommendation

<a id="data-types-recommendation"></a>

More details about SQL Server data types and mapping it with another databases and program languages you can find [here](https://github.com/ktaranov/sqlserver-kit/blob/master/SQL%20Server%20Data%20Types.md)

| Data               | Type                | ANSI |                              Range/Value | Why use or not                                                                 |
| ------------------ | ------------------- | ---- | ---------------------------------------: | ------------------------------------------------------------------------------ |
| Numerics           | [bit]               | No   |                                      1,0 | `bit` convert any number (except 0) to 1, 0 converted to 0                     |
| Numerics           | [tinyint][1]        | No   |                                    0,255 | for saving 3 bytes compare to `int` data type or for replacing `bit` data type |
| Numerics           | [smallint][1]       | Yes  |                              -2^15, 2^15 | for saving 2 bytes compare to `int` data type                                  |
| Numerics           | [int][1]            | Yes  |                              -2^31, 2^31 |                                                                                |
| Numerics           | [bigint][1]         | No   |                              -2^63, 2^63 |                                                                                |
| Numerics           | [decimal][2]        | Yes  |                            -10^38, 10^38 |                                                                                |
| Floating Numbers   | [real][4]           | Yes  |                                          |                                                                                |
| Floating Numbers   | [float][4](1-24)    | Yes  |                                          | SQL Server automatically converts `float(1-24)` to `real` data type            |
| Floating Numbers   | [float][4](24-53)   | Yes  |                                          |                                                                                |
| Date and Time      | [datetime2]         | No   |            YYYY-MM-DD hh:mm:ss[.nnnnnnn] | Use this until you have a special requirement                                  |
| Date and time      | [datetimeoffset]    | No   | YYYY-MM-DD hh:mm:ss[.nnnnnnn][+\|-]hh:mm | Only use if you need to save Timezone, otherwise to save storage use datetime2 |
| Date and Time      | [datetime]          | Yes  |                                          | [On the Advantages of DateTime2(n) over DateTime]                              |
| Date and Time      | [smalldatetime]     | No   |                                          |                                                                                |
| Date and Time      | [date]              | Yes  |                               YYYY-MM-DD |                                                                                |
| Date and Time      | [time]              | Yes  |                       hh:mm:ss[.nnnnnnn] |                                                                                |
| Character Strings  | [char][5]           | Yes  |                                  1, 8000 | Save 1 byte from `varchar`, but be ready for trailing spaces                   |
| Character Strings  | [varchar][5]        | Yes  |                                  1, 8000 |                                                                                |
| Character Strings  | [varchar(max)][5]   | Yes  |                            1, (2^31 - 1) |                                                                                |
| Character Strings  | [nchar][6]          | Yes  |                                  1, 4000 |                                                                                |
| Character Strings  | [nvarchar][6]       | Yes  |                                  1, 4000 |                                                                                |
| Character Strings  | [nvarchar(max)][6]  | Yes  |                            1, (2^31 - 1) |                                                                                |
| Binary Strings     | [varbinary][8]      | Yes  |                                          |                                                                                |
| Binary Strings     | [varbinary(max)][8] | Yes  |                                          |                                                                                |
| Other Data Types   | [rowversion]        | No   |                                          |                                                                                |
| Other Data Types   | [uniqueidentifier]  | No   |                                          |                                                                                |
| Other Data Types   | [xml]               | Yes  |                                          |                                                                                |
| Other Data Types   | [table]             | No   |                                          |                                                                                |
| Spatial Data Types | [geography]         | No   |                                          |                                                                                |

[1]: https://docs.microsoft.com/sql/t-sql/data-types/int-bigint-smallint-and-tinyint-transact-sql
[2]: https://docs.microsoft.com/sql/t-sql/data-types/decimal-and-numeric-transact-sql
[3]: https://docs.microsoft.com/sql/t-sql/data-types/money-and-smallmoney-transact-sql
[4]: https://docs.microsoft.com/sql/t-sql/data-types/float-and-real-transact-sql
[5]: https://docs.microsoft.com/sql/t-sql/data-types/char-and-varchar-transact-sql
[6]: https://docs.microsoft.com/sql/t-sql/data-types/nchar-and-nvarchar-transact-sql
[7]: https://docs.microsoft.com/sql/t-sql/data-types/ntext-text-and-image-transact-sql
[8]: https://docs.microsoft.com/sql/t-sql/data-types/binary-and-varbinary-transact-sql
[9]: https://www.red-gate.com/hub/product-learning/sql-prompt/avoid-use-money-smallmoney-datatypes
[bit]: https://docs.microsoft.com/sql/t-sql/data-types/bit-transact-sql
[date]: https://docs.microsoft.com/sql/t-sql/data-types/date-transact-sql
[smalldatetime]: https://docs.microsoft.com/sql/t-sql/data-types/smalldatetime-transact-sql
[time]: https://docs.microsoft.com/sql/t-sql/data-types/time-transact-sql
[datetime2]: https://docs.microsoft.com/sql/t-sql/data-types/datetime2-transact-sql
[datetime]: https://docs.microsoft.com/sql/t-sql/data-types/datetime-transact-sql
[datetimeoffset]: https://docs.microsoft.com/sql/t-sql/data-types/datetimeoffset-transact-sql
[rowversion]: https://docs.microsoft.com/sql/t-sql/data-types/rowversion-transact-sql
[uniqueidentifier]: https://docs.microsoft.com/sql/t-sql/data-types/uniqueidentifier-transact-sql
[xml]: https://docs.microsoft.com/sql/t-sql/xml/xml-transact-sql
[table]: https://docs.microsoft.com/sql/t-sql/data-types/table-transact-sql
[geometry]: https://docs.microsoft.com/sql/t-sql/spatial-geometry/spatial-types-geometry-transact-sql
[geography]: https://docs.microsoft.com/sql/t-sql/spatial-geography/spatial-types-geography
[on the advantages of datetime2(n) over datetime]: http://www.sqltact.com/2012/12/on-advantages-of-datetime2n-over.html
[differences between sql server text and varchar(max) data type]: https://sqlhints.com/2016/05/11/differences-between-sql-server-text-and-varcharmax-data-type/
[nvarchar(max) vs ntext in sql server]: https://www.sqlservercurry.com/2010/07/nvarcharmax-vs-ntext-in-sql-server.html
[varbinary(max) tames the blob]: https://www.itprotoday.com/microsoft-visual-studio/varbinarymax-tames-blob
[removed]: https://feedback.azure.com/forums/908035-sql-server/suggestions/32889865-deprecate-timestamp-the-keyword-not-rowversion-i

**[⬆ back to top](#table-of-contents)**

## T-SQL Programming Style

<a id="t-sql-programming-style"></a>
SQL Server T-SQL Coding Conventions, Best Practices, and Programming Guidelines.

### General programming T-SQL style

<a id="#general-t-sql-programming-style"></a>

- For database objects names in code use only schema plus object name, do not hardcode server and database names in your code: `dbo.my_table` is good and bad `PRODSERVER.PRODDB.dbo.my_table`.
- Use **spaces** instead of tabs
- Avoid using asterisk in select statements `SELECT *`, use explicit column names `SELECT my_table.my_column1`.
  More details [here](https://www.red-gate.com/hub/product-learning/sql-prompt/finding-code-smells-using-sql-prompt-asterisk-select-list).
- Prefer [ANSI syntax](http://standards.iso.org/ittf/PubliclyAvailableStandards/c053681_ISO_IEC_9075-1_2011.zip) and functions ([`CAST`][10] instead [`CONVERT`][10], [`COALESE`](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/coalesce-transact-sql) instead [`ISNULL`](https://docs.microsoft.com/en-us/sql/t-sql/functions/isnull-transact-sql), etc.).
- Use `;` at the end of every expression.
- Add line break and GO on the next line of the express.
- Keywords should be in **UPPERCASE**: `SELECT`, `FROM`, `GROUP BY` etc.
- Data types declaration should be in **lowercase**: `varchar(30)`, `int`, `real`, `nvarchar(max)` etc.
- All system database and tables must be in **lowercase** for properly working for Case Sensitive instance: `master, sys.tables …`.
- Avoid non-standard column aliases, Use double-quotes for special characters and always use `AS` keyword before alias:

  ```sql
  SELECT
         p.last_name AS "Last Name"
    FROM dbo.person AS p;
  ```

- The first argument in `SELECT` expression should be on the next line:
- Arguments are divided by line breaks, commas should be placed before an argument:

  ```sql
  SELECT
         first_name
       , last_name
  ```

- Avoid specifying integers in the `ORDER BY` clause as positional representations of the columns in the select list.
  More details [here](https://docs.microsoft.com/en-us/sql/t-sql/queries/select-order-by-clause-transact-sql#best-practices).

  ```sql
  /* bad */
  SELECT product_id, name FROM dbo.production ORDER BY 2;

  /* good */
  SELECT product_id, name FROM dbo.production ORDER BY name;
  ```

- Avoid ambiguous formats for date-only literals, use `CAST('yyyymmdd' AS DATE)` format.
- Avoid treating dates like strings and avoid calculations on the left-hand side of the `WHERE` clause.
  More details [here](https://sqlblog.org/2009/10/16/bad-habits-to-kick-mis-handling-date-range-queries).
- Avoid using [hints](https://docs.microsoft.com/en-us/sql/t-sql/queries/hints-transact-sql) except `RECOMPILE` if needed and `NOEXPAND` (see next tip).
  More details [here](https://www.red-gate.com/hub/product-learning/sql-prompt/sql-prompt-code-analysis-a-hint-is-used-pe004-7).
- Avoid use of `SELECT…INTO` for production code, use instead `CREATE TABLE` + `INSERT INTO …` approach. More details [here](https://www.red-gate.com/hub/product-learning/sql-prompt/use-selectinto-statement).
- Use only ISO standard JOINS syntaxes. The _old style_ Microsoft/Sybase `JOIN` style for SQL, which uses the `=*` and `*=` syntax, has been deprecated and is no longer used.
  It is always better to specify the type of join you require `INNER`, `LEFT OUTER`, `RIGHT OUTER`, `FULL OUTER` and `CROSS`.
- Use `EXISTS` or `NOT EXISTS` if referencing a subquery, and `IN` or `NOT IN` when have a list of literal values.
  More details [here](https://www.brentozar.com/archive/2018/08/a-common-query-error/).
- For concatenate unicode strings:

  - always using the upper-case `N`;
  - always store into a variable of type `nvarchar(max)`;
  - avoid truncation of string literals, simply ensure that one piece is converted to `nvarchar(max)`.
    Example:

  ```tsql
  DECLARE @nvcmaxVariable nvarchar(max);
  SET @nvcmaxVariable = CAST(N'Some text ' AS nvarchar(max)) + N'something else' + N'another';
  SELECT @nvcmaxVariable;
  ```

  More details [here](https://themondaymorningdba.wordpress.com/2018/09/13/them-concatenatin-blues/).

- Always specify a length to any text-based data type such as `varchar`, `nvarchar`, `char`, `nchar`:

  ```sql
   /* bad */
   DECLARE @myBadVarcharVariable  varchar;
   DECLARE @myBadNVarcharVariable nvarchar;
   DECLARE @myBadCharVariable     char;
   DECLARE @myBadNCharVariable    nchar;

   /* good */
   DECLARE @myGoodVarchareVariable  varchar(50);
   DECLARE @myGoodNVarchareVariable nvarchar(90);
   DECLARE @myGoodCharVariable      char(7);
   DECLARE @myGoodNCharVariable     nchar(10);
  ```

  More details [here](https://www.red-gate.com/hub/product-learning/sql-prompt/using-a-variable-length-datatype-without-explicit-length-the-whys-and-wherefores).

- Use only [`ORIGINAL_LOGIN()`](https://docs.microsoft.com/en-us/sql/t-sql/functions/original-login-transact-sql) function because is the only function that consistently returns the actual login name that we started with regardless of impersonation.
  More details [here](https://sqlstudies.com/2015/06/24/which-user-function-do-i-use/).

**[⬆ back to top](#table-of-contents)**

## Official Reference and useful links

<a id="reference"></a>

- [Transact-SQL Formatting Standards](https://www.simple-talk.com/sql/t-sql-programming/transact-sql-formatting-standards-%28coding-styles%29/) (by Robert Sheldon)
- [Subjectivity: Naming Standards](http://blogs.sqlsentry.com/aaronbertrand/subjectivity-naming-standards/) (by Aaron Bertrand)
- [General Database Conventions](http://kejser.org/database-naming-conventions/general-database-conventions/) (by Thomas Kejser)
- [Writing Readable SQL](http://www.codeproject.com/Articles/126380/Writing-Readable-SQL) (by Red Gate)
- [SQL Style Guide](http://www.sqlstyle.guide/) (by Simon Holywell)
- [SQL Code Layout and Beautification](https://www.simple-talk.com/sql/t-sql-programming/sql-code-layout-and-beautification/) (by William Brewer)
- [TSQL Coding Style](http://www.databasejournal.com/features/mssql/tsql-coding-style.html) (by Gregory Larsen)
- [User-Defined Functions](https://docs.microsoft.com/en-us/sql/relational-databases/user-defined-functions/user-defined-functions)
- [Synonyms (Database Engine)](https://docs.microsoft.com/en-us/sql/relational-databases/synonyms/synonyms-database-engine)
- [Primary and Foreign Key Constraints](https://docs.microsoft.com/en-us/sql/relational-databases/tables/primary-and-foreign-key-constraints)
- [sys.objects](https://docs.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-objects-transact-sql)
- [SQL Server Constraints](https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-table-table-constraint-transact-sql)
- [CHECK Constraint TECHNET](http://technet.microsoft.com/en-us/library/ms188258%28v=sql.105%29.aspx)
- [SQL Server CLR Integration](https://docs.microsoft.com/en-us/dotnet/framework/data/adonet/sql/introduction-to-sql-server-clr-integration)
- [Deploying CLR Database Objects](https://docs.microsoft.com/en-us/sql/relational-databases/clr-integration/deploying-clr-database-objects)
- [User-defined Functions](https://docs.microsoft.com/en-us/sql/relational-databases/user-defined-functions/create-user-defined-functions-database-engine)
- [SET NOCOUNT ON (Transact-SQL)](https://docs.microsoft.com/en-us/sql/t-sql/statements/set-nocount-transact-sql)
- [T-SQL Coding Guidelines Presentation](http://www.slideshare.net/chris1adkin/t-sql-coding-guidelines) (by Chris Adkin)
- [Sql Coding Style](http://c2.com/cgi/wiki?SqlCodingStyle)
- [SQL Server Code Review Checklist for Developers](https://www.sqlshack.com/sql-server-code-review-checklist-for-developers/) (by Samir Behara)
- [SQL Formatting standards – Capitalization, Indentation, Comments, Parenthesis](https://solutioncenter.apexsql.com/sql-formatting-standards-capitalization-indentation-comments-parenthesis/) (by ApexSQL)
- [In The Cloud: The Importance of Being Organized](http://sqlblog.com/blogs/john_paul_cook/archive/2017/05/16/in-the-cloud-the-importance-of-being-organized.aspx)
- [Naming Conventions in Azure](http://www.sqlchick.com/entries/2017/6/24/naming-conventions-in-azure)
- [The Basics of Good T-SQL Coding Style – Part 3: Querying and Manipulating Data](https://www.simple-talk.com/sql/t-sql-programming/basics-good-t-sql-coding-style-part-3-querying-manipulating-data/)
- [SQL naming conventions](https://www.red-gate.com/simple-talk/blogs/sql-naming-conventions/) (by Phi Factor)
- [SQL Server Compact Object Limitations](http://technet.microsoft.com/en-us/library/ms172451%28v=sql.110%29.aspx)
- [Dos and Don'ts of Dynamic SQL](https://www.sqlservercentral.com/articles/dos-and-donts-of-dynamic-sql) (by Thom Andrews)

**[⬆ back to top](#table-of-contents)**

[`top`]: https://docs.microsoft.com/it-it/sql/t-sql/queries/top-transact-sql
[`fetch-offset`]: https://docs.microsoft.com/en-us/sql/t-sql/queries/select-order-by-clause-transact-sql
[`exec`]: https://docs.microsoft.com/en-us/sql/t-sql/language-elements/execute-transact-sql
[10]: https://docs.microsoft.com/en-us/sql/t-sql/functions/cast-and-convert-transact-sql
