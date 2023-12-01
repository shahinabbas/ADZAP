class Solution:
    def checkString(self, s):
        a=''.join(sorted(s))
        print(a)
        if a==s:
            return True
        return False


s=Solution()
res=s.checkString('aabababa')
print(res)