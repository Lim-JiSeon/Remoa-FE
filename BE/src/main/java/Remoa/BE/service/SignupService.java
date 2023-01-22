package Remoa.BE.service;

import Remoa.BE.domain.Member;
import Remoa.BE.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@Slf4j
public class SignupService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public Long join(Member member) {
        this.validateDuplicateMember(member);
        member.hashPassword(this.bCryptPasswordEncoder);
        member.setRole("USER");
        this.memberRepository.save(member);
        return member.getMemberId();
    }

    private void validateDuplicateMember(Member member) {
        log.info("member={}", member.getEmail());
        List<Member> findMembers = this.memberRepository.findByEmail(member.getEmail());
        if (!findMembers.isEmpty()) {
            log.info("findMember={}", findMembers.get(0).getEmail());
            log.info("findMember={}", findMembers.get(0).getName());
            log.info("findMember={}", findMembers.get(0).getSex());

            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

    public Member findOne(Long memberId) {
        return this.memberRepository.findOne(memberId);
    }

    public SignupService(final MemberRepository memberRepository, final PasswordEncoder bCryptPasswordEncoder) {
        this.memberRepository = memberRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
}