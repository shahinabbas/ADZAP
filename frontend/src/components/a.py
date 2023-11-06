class Solution:
    def areOccurrencesEqual(self, s):
        a=[]
        b=set(s)
        for i in b:
            if s.count(i):
                a.append(s.count(i))
        
        d=all(char == a[0] for char in a) 
        return d

        


s = Solution()
res = s.areOccurrencesEqual(s="abcbac")
print(res)
