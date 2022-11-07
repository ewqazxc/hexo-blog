---
title: Linux 中 find 命令
date: 2022-07-10
---

## Linux 中 find 命令的 35 个实际例子

1. 在当前目录中使用名称查找文件
```sh
find . -name fileName
# 输出找到的文件路径
```

2. 在指定目录下查找文件
```sh
find /targetPath -name fileName
```

3. 查找文件时忽略大小写
```sh
find . -iname fileName
```

4. 使用名称查找目录
```sh
find / -type d -name fileDirName
```

5. 使用名称查找指定后缀名的文件
```sh
find . -type f -name fileName.ext
```

6. 查找目录中所有指定后缀的文件
```sh
find . -type f -name "*.ext"
```

7. 查找具有 777 权限的文件
```sh
find . -type f -perm 0777 -print
```
8. 查找没有 777 权限的文件

未经许可查找所有文件777
```sh
find / -type f ! -perm 777
```

9. 查找具有 644 权限的 SGID 文件

找到所有的SGID bit权限设置为的文件644
```sh
find / -perm 2644
```

10. 查找具有 551 权限的粘滞位文件

找到所有的Sticky Bit设置权限为551
```sh
find / -perm 551
```

11. 查找 SUID 文件

找到所有SUID设置文件。
```sh
find / -perm /u=s
```

12. 查找 SGID 文件

找到所有SGID设置文件。
```sh
find / -perm /g=s
```

13. 查找只读文件

找到所有Read Only文件。
```sh
find / -perm /u=r
```

14. 查找可执行文件

找到所有Executable文件。
```sh
find / -perm /a=x
```

15. 查找权限为 777 且 chmod 为 644 的文件

找到所有777权限文件和使用chmod命令设置权限644
```sh
find / -type f -perm 0777 -print -exec chmod 644
```

16. 查找权限为 777 且 chmod 为 755 的目录
找到所有777权限目录和使用chmod命令设置权限755

# find / -type d -perm 777 -print -exec chmod 755 {} \;
17. 查找和删除单个文件
查找名为的单个文件rumenz.txt并将其删除。

# find . -type f -name "rumenz.txt" -exec rm -f {} \;
18. 查找和删除多个文件
查找和删除多个文件，例如.mp3要么.txt，然后使用。

# find . -type f -name "*.txt" -exec rm -f {} \;

OR

# find . -type f -name "*.mp3" -exec rm -f {} \;
19. 查找所有空文件
查找某个路径下的所有空文件。

# find /tmp -type f -empty
20. 查找所有空目录
将某个路径下的所有空目录归档。

# find /tmp -type d -empty
21. 归档所有隐藏文件
要查找所有隐藏文件，请使用以下命令。

# find /tmp -type f -name ".*"
22. 根据用户查找单个文件
查找所有或单个文件rumenz.txt在下面/所有者 root 的根目录。

# find / -user root -name rumenz.txt
23. 根据用户查找所有文件
查找属于用户的所有文件rumenz在下面/home目录。

# find /home -user rumenz
24. 根据组查找所有文件
查找属于该组的所有文件Developer在下面/home目录。

# find /home -group developer
25. 查找用户的特定文件
查找所有.txt用户文件rumenz在下面/home目录。

# find /home -user rumenz -iname "*.txt"
26. 查找最近 50 天修改过的文件
查找所有被修改的文件50几天回来。

# find / -mtime 50
27. 查找最近 50 天访问过的文件
查找所有被访问的文件50几天回来。

# find / -atime 50
28. 查找最近 50-100 天修改过的文件
查找所有修改超过的文件50几天前，不到100天。

# find / -mtime +50 –mtime -100
29. 查找过去 1 小时内更改过的文件
查找上次更改的所有文件1 hour

# find / -cmin -60
30. 查找最近 1 小时内修改过的文件
查找上次修改的所有文件1 hour

# find / -mmin -60
31. 查找过去 1 小时内访问过的文件
查找上次访问的所有文件1 hour

# find / -amin -60
32. 找到 50MB 的文件
查找所有50MB文件，使用。

# find / -size 50M
33. 查找 50MB – 100MB 之间的大小
查找所有大于50MB并且小于100MB

# find / -size +50M -size -100M
34. 查找和删除 100MB 文件
查找所有100MB文件并使用一个命令删除它们。

# find / -type f -size +100M -exec rm -f {} \;
35. 查找特定文件并删除
找到所有.mp3文件超过10MB并使用一个命令删除它们。

# find / -type f -name *.mp3 -size +10M -exec rm {} \;






